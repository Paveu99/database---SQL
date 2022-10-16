const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'megak_todo_list',
  decimalNumbers: true,
  namedPlaceholders: true,
});

module.exports = {
  pool,
};
