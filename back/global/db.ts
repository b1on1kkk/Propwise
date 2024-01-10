const mysql = require("mysql");

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "propwise"
});
