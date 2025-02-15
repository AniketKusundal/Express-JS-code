const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const util = require('util')
const url = require('url')
const app = express()



// Middelware -- body-parser
app.use(bodyParser.urlencoded ({extended:true}))


// Database connection
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node_second'
})


// Util Module use for Writing a quary
var execute = util.promisify(connection.query).bind(connection)



app.get("/", function(req , res){
    res.render("home.ejs")
})



app.get("/add_teacher" , function(req , res){
    res.render("add_teacher.ejs")
    res.redirect("/")
})


app.post("/save_teacher" , function(req , res){
        // res.send(req.body)    // it send the data to browser body In JSON format
    
        //  Create Table Quary
        // CREATE TABLE Teacher_Info(teacher_id INT PRIMARY KEY AUTO_INCREMENT , teacher_name VARCHAR(200) , teacher_mobile VARCHAR(15) , teacher_email VARCHAR(100) , teacher_dob VARCHAR(20) , teacher_address VARCHAR(200))

        // Insert into teacher table Quary

        var BodyData = req.body
        var data = execute(`INSERT INTO teacher_info(teacher_name , teacher_mobile , teacher_email , teacher_dob , teacher_address) VALUES ('${BodyData.teacher_name}' , '${BodyData.teacher_mobile}' , '${BodyData.teacher_email}' , '${BodyData.teacher_dob}' , '${BodyData.teacher_address}')`)
        res.redirect("/")
    
});


app.get("/teacher_list" ,async function(req , res){

    var getData = await execute(`SELECT * FROM teacher_info`)
    var obj = {"teacher_list":getData}
    res.render("teacher_list.ejs" , obj)
});


app.get("/delete_record/:teacher_id" , function(req , res){

    var id = req.params.teacher_id
    execute(`DELETE FROM teacher_info WHERE teacher_id = '${id}'` , function(err , data){
        console.log(err);
    })
        res.redirect("/teacher_list")
})


//  Search From Table Or Search Action How to search implement in our website


app.get("/search_teacher" ,async function(req , res){

    // first we Use get method for search beacuase we search data from url  IMPORT url module first then search from url
    var urlData = url.parse(req.url, true).query;
    var SearchName = urlData.search;

    var data = await execute(`SELECT * FROM teacher_info WHERE teacher_name LIKE '%${SearchName}%'`); // Use LIKE for approximate match when we use Here (=) they search for the exact search

    var obj = {'teacher_list':data}
    res.render('teacher_list.ejs' , obj)

})


app.listen(5000)