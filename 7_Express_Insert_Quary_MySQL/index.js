const express = require('express')
const bodyparser = require('body-parser');
const mysql = require('mysql')
const app = express()

// middelware 
app.use(bodyparser.urlencoded({ extended: true }));

var connection = mysql.createConnection
({
    host:'localhost',
    user:'root',
    password:'',
    database:'node_first'
}) 


app.get("/" , function(req , res){
    res.render('add_teacher.ejs')
});



app.post("/save_teacher" , function(req , res){
    var sqlQuary = `INSERT INTO teacher_table(
        teacher_name , 
        teacher_email ,
        teacher_password , 
        teacher_address
    ) 
    VALUES 
    (
        '${req.body.teacher_name}',
        '${req.body.teacher_email}',
        '${req.body.teacher_password}',
        '${req.body.teacher_address}')`
    
    connection.query(sqlQuary , function(err , data){
        console.log(err);
        console.log(data);
        
    });
    res.send(sqlQuary)
});

app.listen(4000);