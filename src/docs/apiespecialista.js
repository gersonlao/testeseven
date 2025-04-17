/**
 * @swagger
 * tags:
 *   name: Especialistas
 *   description: Endpoints relacionados ao cadastro de especialistas
 */

/**
 * @swagger
 * /especialista:
 *   post:
 *     summary: Cadastra um novo especialista
 *     tags: [Especialistas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuarioId
 *               - especialidade
 *               - limiteDiario
 *               - intervaloMinimo
 *               - disponibilidade
 *             properties:
 *               usuarioId:
 *                 type: string
 *                 format: uuid
 *                 example: 3de61b5d-0e0d-4946-a394-9afa77e52054
 *               especialidade:
 *                 type: string
 *                 example: Psicologia
 *               limiteDiario:
 *                 type: integer
 *                 example: 5
 *               intervaloMinimo:
 *                 type: integer
 *                 example: 30
 *               disponibilidade:
 *                 type: string
 *                 example: "Segunda a sexta, das 08:00 às 18:00"
 *     responses:
 *       201:
 *         description: Especialista criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 usuarioId:
 *                   type: string
 *                   format: uuid
 *                 especialidade:
 *                   type: string
 *                 limiteDiario:
 *                   type: integer
 *                 intervaloMinimo:
 *                   type: integer
 *                 disponibilidade:
 *                   type: string
 *       409:
 *         description: Usuário já está cadastrado como especialista
 *       500:
 *         description: Erro interno no servidor
 */
