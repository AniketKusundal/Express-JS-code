const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const util = require('util');

const app = express();

// Middelware for the get data from form body 
app.use(bodyParser.urlencoded({ extended: true }));

// DataBase Connection 
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_second'
});

// util.promisify(Connection.query) converts the callback-based query() function from the mysql module into a Promise-based function.
// .bind(Connection) ensures that the execute function still works with the correct database connection.
var execute = util.promisify(connection.query).bind(connection);

app.get("/", async function (req, res) {
    var data = await execute('SELECT * FROM student');
    var obj = { list: data }
    res.render("home.ejs", obj);
    // console.log(data);
});

app.post("/save_student", async function (req, res) {
    // QUary For The Insert Data in the table
    await execute(`INSERT INTO student(student_name, student_mobile, student_email) 
                   VALUES('${req.body.student_name}', '${req.body.student_mobile}', '${req.body.student_email}')`);
    res.redirect("/");
});

app.get("/delete_student/:student_id", function (req, res) {

    var id = req.params.student_id;
    connection.query(`DELETE FROM student WHERE student_id = '${id}'`, function (err, data) {
        console.log(err);
    });
    res.redirect("/");
});

app.listen(4000);
