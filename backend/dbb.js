const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "bharathi@003",
  database: "bha"
});

db.connect((err) => {
  if (err) {
    console.log("Connection Failed:", err);
  } else {
    console.log("MySQL Connected Successfully");
  }
});