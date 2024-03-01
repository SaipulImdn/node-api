const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'saipulimdn',
  password: 'saipul1452',
  database: 'node-api',
});

module.exports = connection;
