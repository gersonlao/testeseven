/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Endpoints para cadastro de clientes
 */

/**
 * @swagger
 * /cliente:
 *   post:
 *     summary: Cadastra um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *               - telefone
 *               - cpf
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João da Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *               telefone:
 *                 type: string
 *                 example: (11) 91234-5678
 *               cpf:
 *                 type: string
 *                 example: 123.456.789-00
 *     responses:
 *       201:
 *         description: Cliente cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clienteId:
 *                   type: string
 *                   example: clt_abc123
 *                 usuarioId:
 *                   type: string
 *                   example: usr_xyz789
 *                 nome:
 *                   type: string
 *                   example: João da Silva
 *                 email:
 *                   type: string
 *                   example: joao@email.com
 *       400:
 *         description: Dados inválidos ou e-mail já cadastrado
 *       500:
 *         description: Erro interno no servidor
 */
