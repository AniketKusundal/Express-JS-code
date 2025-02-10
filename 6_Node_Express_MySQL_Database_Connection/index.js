const express = require("express");
const mysql = require("mysql");
const app = express();

// Connecting MySQL
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_first",
});

connection.connect();

app.get("/", function (req, res) {
  connection.query(
    `
        CREATE TABLE teacher_table (
            teacher_id INT PRIMARY KEY AUTO_INCREMENT,
            teacher_name VARCHAR(200),
            teacher_email VARCHAR(150),
            teacher_password VARCHAR(200),
            teacher_address TEXT
        )
    `,
    function (err, data) {
      console.log(err || "Table Created Successfully...");
      console.log(data);
    }
  );

  res.send("Table Created And Data Inserted Successfully...");
});

app.listen(3000);
