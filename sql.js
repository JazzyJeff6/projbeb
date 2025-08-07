const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '100.90.133.111', 
  user: 'root', 
  password: 'Miticdragon0611!', 
  database: 'DrinkHub', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;