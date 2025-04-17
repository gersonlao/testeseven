const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/auth');  // Importando as rotas
const specialistaRoutes = require('./src/routes/especialista'); // Importando as rotas
const disponibilidadeRoutes = require('./src/routes/disponibilidade');
const agendamentoRoutes = require('./src/routes/agendamento');
const clienteRoutes = require('./src/routes/cliente');
const scheduler = require('./scheduler');
const setupSwagger = require('./swagger');

dotenv.config();  // Carrega as variáveis de ambiente do arquivo .env

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());  // Para permitir o corpo JSON nas requisições

setupSwagger(app);

app.use('/auth', authRoutes); // Usando as rotas definidas no arquivo auth.js
app.use('/especialista', specialistaRoutes);
app.use('/disponibilidade', disponibilidadeRoutes);
app.use('/agendamentos', agendamentoRoutes);
app.use('/cliente', clienteRoutes);


// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});