const mysql = require('mysql2/promise');
require('dotenv').config;

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'teste_prg_user1',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

module.exports = pool;
