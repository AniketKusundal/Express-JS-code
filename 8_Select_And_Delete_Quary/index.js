const express = require('express')
const mysql = require('mysql')
const url = require('url')
const app = express()



var connection = mysql.createConnection
({
    host:'localhost',
    user:'root',
    password:'',
    database:'node_second'
});


app.get("/" , function(req , res){
    connection.query(`SELECT * FROM constomer_table` , function(err , data){
        var obj = {list:data}
        res.render('print_data.ejs' , obj);
    });
});


app.get("/delete_data" ,function(req , res){
    var urlData = url.parse(req.url , true).query
    connection.query(`DELETE FROM constomer_table WHERE coust_id = '${urlData.id}'`, function(err, data){
        console.log(err);
        console.log(data);
        
    })
    res.redirect("/")
})

app.listen(1000)