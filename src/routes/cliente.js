const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { nome, email, senha, telefone, cpf } = req.body;

  if (!nome || !email || !senha || !telefone || !cpf) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'E-mail já cadastrado.' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaCriptografada,
        role: 'cliente',
      },
    });

    const novoCliente = await prisma.cliente.create({
      data: {
        usuarioId: novoUsuario.id,
        telefone,
        cpf,
      },
    });

    res.status(201).json({
      clienteId: novoCliente.id,
      usuarioId: novoUsuario.id,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar cliente.' });
  }
});

module.exports = router;
