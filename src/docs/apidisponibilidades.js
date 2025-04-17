/**
 * @swagger
 * tags:
 *   name: Disponibilidade
 *   description: Endpoints para verificar disponibilidade de especialistas
 */

/**
 * @swagger
 * /disponibilidade:
 *   get:
 *     summary: Busca especialistas disponíveis para uma especialidade e data
 *     tags: [Disponibilidade]
 *     parameters:
 *       - name: especialidade
 *         in: query
 *         description: Especialidade do especialista
 *         required: true
 *         schema:
 *           type: string
 *           example: Psicologia
 *       - name: data
 *         in: query
 *         description: Data para verificar disponibilidade (formato YYYY-MM-DD)
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: 2025-04-18
 *     responses:
 *       200:
 *         description: Lista de especialistas disponíveis com horários livres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   especialistaId:
 *                     type: string
 *                     example: 3de61b5d-0e0d-4946-a394-9afa77e52054
 *                   nomeEspecialista:
 *                     type: string
 *                     example: João da Silva
 *                   especialidade:
 *                     type: string
 *                     example: Psicologia
 *                   horariosDisponiveis:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "10:00"
 *       400:
 *         description: Especialidade ou data ausente ou inválida
 *       500:
 *         description: Erro interno no servidor
 */
