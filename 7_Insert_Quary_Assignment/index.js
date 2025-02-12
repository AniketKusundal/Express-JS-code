const express = require('express')
const mysql = require('mysql')
const bodyparser = require('body-parser');
const app = express();


// Middelware 
app.use(bodyparser.urlencoded ( {extended: true} ));

var connection = mysql.createConnection
({
    user:'root',
    host:'localhost',
    password:'',
    database:'node_second'
});

connection.connect();


app.get('/' , function(req , res){
    res.render('add_product.ejs')
})


app.post('/added_product' , function(req , res){
    var sqlQuary = `INSERT INTO  product_table(
        product_name,
        product_price,
        product_quantity,
        product_detail
    )
    VALUES
    (
        '${req.body.product_name}',
        '${req.body.product_price}',
        '${req.body.product_quantity}',
        '${req.body.product_detail}'
    )`
    connection.query(sqlQuary , function(err , data){
        console.log(err);
        console.log(data);
        
    })
    res.send(sqlQuary);
})

app.listen(3000)
