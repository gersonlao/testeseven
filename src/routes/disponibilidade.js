const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { getDay } = require('date-fns');

const prisma = new PrismaClient();

const diasSemana = [
  'domingo',
  'segunda',
  'terca',
  'quarta',
  'quinta',
  'sexta',
  'sabado'
];

router.get('/', async (req, res) => {
  const { especialidade, data } = req.query;

  if (!especialidade || !data) {
    return res.status(400).json({ error: 'Especialidade e data são obrigatórios.' });
  }

  try {
    const dataFormatada = new Date(data);
    const diaSemana = diasSemana[getDay(dataFormatada)];

    // Buscar todos os especialistas com seus usuários
    const todosEspecialistas = await prisma.especialista.findMany({
      include: {
        usuario: true, // para acessar nome do usuário
      }
    });

    // Filtro manual insensível a maiúsculas/minúsculas
    const especialistasFiltrados = todosEspecialistas.filter(e =>
      e.especialidade.toLowerCase().includes(especialidade.toLowerCase())
    );

    const resultado = [];

    for (const esp of especialistasFiltrados) {
      const disponibilidade = esp.disponibilidade[diaSemana] || [];

      if (disponibilidade.length === 0) {
        continue; // pular especialista sem horários no dia
      }

      const agendamentos = await prisma.agendamento.findMany({
        where: {
          especialistaId: esp.id,
          data: dataFormatada,
        },
        select: { horario: true },
      });

      const horariosOcupados = agendamentos.map(a => a.horario);
      const horariosLivres = disponibilidade.filter(h => !horariosOcupados.includes(h));

      if (agendamentos.length < esp.limiteDiario && horariosLivres.length > 0) {
        resultado.push({
          especialistaId: esp.id,
          nomeEspecialista: esp.usuario?.nome || 'Sem nome',
          especialidade: esp.especialidade,
          horariosDisponiveis: horariosLivres,
        });
      }
    }

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar disponibilidade' });
  }
});

module.exports = router;


