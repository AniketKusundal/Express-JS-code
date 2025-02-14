const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Database Connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_second'
});

// Route to insert student data
app.post("/save_student", function (req, res) {
    var studentName = req.body.student_name;
    var studentMobile = req.body.student_mobile;
    var studentEmail = req.body.student_email;

    connection.query(`INSERT INTO student (student_name, student_mobile, student_email) VALUES ('${studentName}', '${studentMobile}', '${studentEmail}')`, function (err, data) {
        console.log(err);
    });
    res.redirect("/");
});

// Route to display student table
app.get("/", function (req, res) {
    connection.query("SELECT * FROM student", function (err, data) {
        var obj = { list: data };
        res.render("home.ejs", obj);
    });
});

// Route to delete student data
app.get("/delete_student/:student_id", function (req, res) {

    var id = req.params.student_id;
    connection.query(`DELETE FROM student WHERE student_id = '${id}'`, function (err, data) {
        console.log(err);
    });
    res.redirect("/");
});

// Start Server
app.listen(3000, function () {
    console.log("Server started on port 3000");
});
