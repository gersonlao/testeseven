const cron = require('node-cron');
const { PrismaClient } = require('@prisma/client');
const { addHours, format, parseISO } = require('date-fns');

const prisma = new PrismaClient();

cron.schedule('0 * * * *', async () => {
  //console.log('[Scheduler] Verificando agendamentos pendentes para notificação (24h antes)...');

  const agora = new Date();
  const daqui24h = addHours(agora, 24);
  const dataFormatada = format(daqui24h, 'yyyy-MM-dd');
  const horaFormatada = format(daqui24h, 'HH:mm');

  try {
    const agendamentos = await prisma.agendamento.findMany({
      where: {
        status: 'pendente',
        data: {
          equals: new Date(dataFormatada + 'T00:00:00.000Z') // data exata, ignora horário
        },
        horario: horaFormatada
      },
      include: {
        cliente: { include: { usuario: true } },
        especialista: { include: { usuario: true } }
      }
    });

    agendamentos.forEach((ag) => {
      console.log("O agendamento com o especialista "+ag.especialista.usuario.nome+" será em 24 horas! Cliente: "+ag.cliente.usuario.nome);
    });
  } catch (error) {
    console.error('Erro ao verificar agendamentos (24h antes):', error);
  }
});

