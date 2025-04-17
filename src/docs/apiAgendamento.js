/**
 * @swagger
 * tags:
 *   name: Agendamentos
 *   description: Endpoints para gerenciar agendamentos

 * /agendamentos:
 *   post:
 *     summary: Cria um novo agendamento
 *     tags: [Agendamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clienteUsuarioId
 *               - especialistaId
 *               - data
 *               - horario
 *             properties:
 *               clienteUsuarioId:
 *                 type: string
 *                 example: "uuid-do-usuario"
 *               especialistaId:
 *                 type: string
 *                 example: "uuid-do-especialista"
 *               data:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-20"
 *               horario:
 *                 type: string
 *                 example: "14:00"
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 *       400:
 *         description: Dados inválidos ou indisponibilidade
 *       409:
 *         description: Conflito de agendamento
 *
 * /agendamentos/cliente/{usuarioid}:
 *   get:
 *     summary: Lista agendamentos de um cliente
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: usuarioid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       201:
 *         description: Lista de agendamentos
 *
 * /agendamentos/especilaista/{especialistaid}:
 *   get:
 *     summary: Lista agendamentos de um especialista
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: especialistaid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do especialista
 *     responses:
 *       201:
 *         description: Lista de agendamentos

 * /agendamentos/alterastatus:
 *   put:
 *     summary: Altera o status de um agendamento
 *     tags: [Agendamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - usuarioId
 *               - novostatus
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID do agendamento
 *               usuarioId:
 *                 type: string
 *                 description: ID do usuário que está alterando
 *               novostatus:
 *                 type: string
 *                 enum: [confirmado, cancelado, finalizado]
 *     responses:
 *       201:
 *         description: Status atualizado
 *       400:
 *         description: Status inválido ou cancelamento fora do prazo
 *       401:
 *         description: Acesso negado
 *       403:
 *         description: Agendamento não encontrado
 */
