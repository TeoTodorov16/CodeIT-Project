const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "Teo",
  password: "1682001",
  database: "CodeIT",
});

module.exports = connection;
