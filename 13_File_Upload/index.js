const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
var util = require('util')
const app = express()

// middelware for get data from bodt or form
app.use(bodyParser.urlencoded({extended:true}))

// middelware for the file upload 
app.use(fileUpload())
app.use(express.static('public')); 
// In Express, app.use(express.static('public')) is used to serve static files (like images, CSS, JavaScript, etc.) from a directory







// DB connection
var connection  = mysql.createConnection({
   user:'root',
   host:'localhost',
   password:'',
   database:'node_second'
})


var execute = util.promisify(connection.query).bind(connection)
app.get("/" ,async function(req , res){

   var data =await execute(`SELECT * FROM user_table`)
   var obj = {list:data}
   res.render("form.ejs" , obj)
})







app.post("/save_data" , async function(req , res){
   var fileName =  req.files.user_image.name
   req.files.user_image.mv('public/uploads/'+fileName);

   //  create table quary

   // await execute(`CREATE TABLE user_table(user_id INT PRIMARY KEY AUTO_INCREMENT , user_name VARCHAR(200) , user_mobile VARCHAR(15)  , user_image TEXT)`);


   // Insert Into Table Quary

   var data = req.body
   await execute(`INSERT INTO user_table(user_name , user_mobile , user_image) VALUES ('${data.user_name}' , '${data.user_mobile}' , '${fileName}')`)
   //  in last filed we give the fileName we tak in form direct in data we ahve only body data 

   res.redirect("/")   
})

app.listen(3000)