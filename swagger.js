// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Agendamentos',
    version: '1.0.0',
    description: 'Documentação da API com Swagger',
  },
  tags: [  // <-- Aqui definimos a ordem
    {
      name: 'Autenticação',
      description: 'Endpoints para registro e login de usuários',
    },
    {
      name: 'Clientes',
      description: 'Endpoints para cadastro de clientes',
    },
    {
      name: 'Especialistas',
      description: 'Endpoints para cadastro de especialistas',
    },
    {
      name: 'Disponibilidade',
      description: 'Endpoints para verificar disponibilidade de especialistas',
    },
    {
      name: 'Agendamentos',
      description: 'Operações relacionadas a criação e gerenciamento de agendamentos',
    },
    // Pode adicionar mais tags aqui se quiser controlar a ordem
  ],
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
};


const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js', './src/docs/*.js'], // Adiciona docs aqui
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;