const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const util = require('util')
const app = express()

// middelware for getting data from body (html form)
app.use(bodyParser.urlencoded({extended:true}))


var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node_second'
})


var execute = util.promisify(connection.query).bind(connection)


app.get("/" , function(req , res){
    res.render("home.ejs")
})


app.get("/add_product" , function(req , res){
    res.render("add_product.ejs")
})


app.post("/save_product" ,async function(req , res){
    
    var parseData = req.body
    var InsertQuary = `INSERT INTO product(product_name,product_price,product_description,product_company,product_rating,product_label) VALUES(' ${parseData.product_name}','${parseData.product_price}','${parseData.product_description}','${parseData.product_company}','${parseData.product_rating}','${parseData.product_label}')`;  
    
    
    var data =await execute(InsertQuary)
    // res.send(data)

    res.redirect("/add_product")
}) 



app.get("/product_list" ,async function(req , res){

    var data = await execute('SELECT * FROM product')
    var obj= {'product_list':data}
    res.render("product_list.ejs" , obj)
})


app.get("/delete_product/:id" ,async function(req , res){
    
    var id = req.params.id
    await execute(`DELETE FROM product WHERE product_id='${id}'`)
    res.redirect("/product_list")
})

app.get("/edit_product_info/:id" ,async function(req , res){

    var id = req.params.id
    var data = await execute(`SELECT * FROM product WHERE product_id = '${id}'`);
    var obj = {'info':data}
    res.render("edit_product.ejs" , obj)
})


app.post("/update_info" ,async function(req , res){

    var d = req.body
    var UpdateQuary = `UPDATE product SET product_name='${d.product_name}' , product_price='${d.product_name}' , product_description='${d.product_description}' , product_company='${d.product_company}' , product_rating = '${d.product_rating}' , product_label = '${d.product_label}' WHERE product_id = '${d.product_id}'`;
    var data = await execute(UpdateQuary)
    res.send(data)
    res.redirect("/product_list")

})


app.listen(2000)