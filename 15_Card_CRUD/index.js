const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const util = require('util')
const app = express()



app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload({ createParentPath: true }));
app.use(express.static('public/'))

var connection  = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node_second'
})


var execute = util.promisify(connection.query).bind(connection)


app.get("/" ,async function(req , res){
    var data = await execute('SELECT * FROM card_table')
    var obj = {'list':data}
    res.render("home.ejs" , obj)
})


app.get("/admin" , function(req , res){
    res.render("admin/adminpage.ejs")
})


app.get("/admin/manage_slider" , function(req , res){
    res.send("yes")
})


app.get("/admin/manage_card" , function(req , res){
    res.render("admin/manage_card.ejs")
})


// Add Card Quary 
app.post("/admin/admin/save_card" ,async function(req ,res){

    // for Image Upload
    var fileName = req.files.card_img.name
    req.files.card_img.mv('public/uploads/'+ fileName)



    // Create Table Quary
    // await execute(`CREATE TABLE card_table(card_id INT PRIMA         RY KEY AUTO_INCREMENT , card_img TEXT , card_title VARCHAR(200) , card_description TEXT)`)



    // Quary For Insert
    var data = req.body
    await execute(`INSERT INTO card_table(card_img , card_title , card_description) VALUES ('${fileName}' , '${data.card_title}' , '${data.card_description}')`)

    res.redirect("/admin/manage_card")
})


app.listen(3000)