const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()


// Create Middelware for form data
app.use(bodyParser.urlencoded ({extended:true}));



//  Database Coonection
var connection = mysql.createConnection
({
    user:'root',
    host:'localhost',
    password:'',
    database:'node_second'
})

connection.connect()

app.get("/" , function(req , res){
    res.render("coustomer_info.ejs")
})


app.post('/show_coustomer' , function(req , res){
    var sqlQuary = `INSERT INTO constomer_table
    (
        coust_name,
        coust_mobile,
        coust_email,
        coust_passwoord,
        coust_dob,
        coust_address
    )
    VALUES
    (
        '${req.body.coust_name}',
        '${req.body.coust_mobile}',
        '${req.body.coust_email}',
        '${req.body.coust_passwoord}',
        '${req.body.coust_dob}',    // yyyy - mm - dd
        '${req.body.coust_address}'
    )`
    connection.query(sqlQuary , function(err , data){
        console.log(err);
        console.log(data);
    })
    res.send(sqlQuary)
})

app.listen(9000)