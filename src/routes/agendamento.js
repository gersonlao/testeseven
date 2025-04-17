const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { getDay } = require('date-fns');
const { differenceInHours } = require('date-fns');
const axios = require('axios');

const prisma = new PrismaClient();

const diasSemana = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
const statusPermitidos = ['confirmado', 'cancelado', 'finalizado'];
const tiporole = ['especialista', 'administrador']


router.post('/', async (req, res) => {
  const { clienteUsuarioId , especialistaId, data, horario } = req.body;

  if (!clienteUsuarioId  || !especialistaId || !data || !horario) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {

    // Busca cliente vinculado ao usuário
    const cliente = await prisma.cliente.findUnique({
      where: { usuarioId : clienteUsuarioId }
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }

    // Busca especialista pelo ID (tem que ser o ID do especialista, não do usuário)
    const especialista = await prisma.especialista.findUnique({
      where: { id: especialistaId }
    });

    if (!especialista) {
      return res.status(404).json({ error: 'Especialista não encontrado.' });
    }

    const dataFormatada = new Date(data);
    const diaSemana = diasSemana[getDay(dataFormatada)];

    // Validação da disponibilidade do especialista
    const disponibilidade = especialista.disponibilidade;

  //  console.log(especialista.disponibilidade);

    if (!disponibilidade[diaSemana]) {
      return res.status(400).json({ error: `O especialista não atende às ${diaSemana}s.` });
    }

    //console.log(disponibilidade[diaSemana].includes(horario));
    if (!disponibilidade[diaSemana].includes(horario)) {
      return res.status(400).json({ error: `Horário ${horario} não está disponível na ${diaSemana} para esse especialista.` });
    }    


    // Verifica se o especialista já tem esse horário ocupado
    const conflito = await prisma.agendamento.findFirst({
      where: {
        especialistaId,
        data: dataFormatada,
        horario,
        status: {
          notIn: ['cancelado', 'expirado']
        }
      }
    });

    if (conflito) {
      return res.status(409).json({ error: 'Horário já está ocupado.' });
    }

    const agendamentoDuplicado = await prisma.agendamento.findFirst({
      where: {
        clienteId: cliente.id,
        especialistaId,
        data: dataFormatada,
        horario,
        status: {
          notIn: ['cancelado', 'expirado']
        }
      }
    });

    if (agendamentoDuplicado) {
      return res.status(409).json({ error: 'Você já tem um agendamento com esse especialista nesse horário.' });
    }

    // Cria o agendamento
    const agendamento = await prisma.agendamento.create({
      data: {
        clienteId: cliente.id,
        especialistaId,
        agendadoPorId: clienteUsuarioId,
        data: dataFormatada,
        horario,
        status: 'pendente',
      }
    });

    // site para teste webhook https://webhook.site/
    await axios.post('https://webhook.site/4aec9f18-e563-4680-8b57-ab9f1185a6fc', {
      agendamentoId: agendamento.id,
      cliente: agendamento.clienteId,
      especialista: agendamento.especialistaId ,
      data: agendamento.data,
      horario: agendamento.horario,
      status: agendamento.status
    });

    res.status(201).json(agendamento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar agendamento.' });
  }
});

router.get('/cliente/:usuarioid', async (req,res) => {
  const { usuarioId } = req.params;

  const agendamentos = await prisma.agendamento.findMany({
  where : {
    clienteId: usuarioId
  }  
  })

  res.status(201).json(agendamentos);
});

router.get('/especilaista/:especialistaid', async (req,res) => {
  const { especialistaId } = req.params;

  const agendamentos = await prisma.agendamento.findMany({
    where : { especialistaid: especialistaId }
  })

  if (!agendamentos) {
    res.status(201).json('Não possui agendamentos.');
  } 

  res.status(201).json(agendamentos)
})



router.put('/alterastatus' , async (req,res) =>{
  const { id,usuarioId , novostatus } = req.body;
  
  if (!statusPermitidos.includes(novostatus)) {
    return res.status(400).json({ error: 'Status inválido'});
  }

  try {
    const usuario = await prisma.usuario.findUnique({
      where : { id : usuarioId}
    })


    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado.'})
    }

    if (!tiporole.includes(usuario.role)) {
      return res.status(401).json({ error: 'Acesso negado'})
    }


    const existeagenda = await prisma.agendamento.findFirst({
      where : { id: id
      }
    })

    if (!existeagenda) {
      return res.status(403).json({ error: 'Agendamento não encontrado'})
    }


    if (novostatus === 'cancelado'){
    //  console.log(format(existeagenda.data, 'dd/MM/yyyy'))
      const data = existeagenda.data;        
      const hora = existeagenda.horario;         

      const [horaStr, minutoStr] = hora.split(':');
      const dataHoraAgendada = new Date(data);
      dataHoraAgendada.setHours(parseInt(horaStr));
      dataHoraAgendada.setMinutes(parseInt(minutoStr));
      dataHoraAgendada.setSeconds(0);  
      
      const agora = new Date();

      const diferencadthr =  differenceInHours(dataHoraAgendada,agora)

      if (diferencadthr < 6) {
        return res.status(400).json({ error: 'Cancelamento permitido apenas com no mínimo 6 horas de antecedência.' });
      }
    }

    const atualizado = await prisma.agendamento.update({
      where : {id },
      data : {
        status : novostatus
      }
    })

    return res.status(201).json({ message: 'Status alterado com sucesso.', agendamento : atualizado});

  } catch (error) {
    //return res.status(500).json({ error : 'Erro ao atualizar status do agendamento.'})
    return res.status(500).json({ error : error.message})
  }
})

module.exports = router;


