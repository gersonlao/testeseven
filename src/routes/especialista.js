const express = require('express');
const prisma = require('../config/prisma'); // ajuste o caminho se necessário
const router = express.Router();

// Criar especialista
router.post('/', async (req, res) => {
  try {
    const { usuarioId, especialidade, limiteDiario, intervaloMinimo, disponibilidade } = req.body;

        // Verifica se já existe um especialista com esse usuarioId
        const especialistaExistente = await prisma.especialista.findUnique({
          where: { usuarioId },
        });
    


        if (especialistaExistente) {
          return res.status(409).json({ error: 'Usuário já está cadastrado como especialista.' });
        }

    const especialista = await prisma.especialista.create({
      data: {
        usuarioId,
        especialidade,
        limiteDiario,
        intervaloMinimo,
        disponibilidade,
      },
    });

    res.status(201).json(especialista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar especialista' });
  }
});

module.exports = router;
