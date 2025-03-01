const express = require('express')
const mysql = require('mysql')
const bodyparser = require('body-parser')
const fileUpload = require('express-fileupload')
const util = require('util')
const { log } = require('console')
const app = express()

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node_second'
})


app.use(express.static('public'))
app.use(bodyparser.urlencoded({extended:true}))
app.use(fileUpload())




var execute = util.promisify(connection.query).bind(connection)


app.get("/" ,async function(req , res){

    var data =  await execute(`SELECT * FROM slider`)
    var show = {list:data}
    res.render("home.ejs" , show)
})




app.get("/manage_slider" ,async function(req , res){


    var data =  await execute(`SELECT * FROM slider`)
    var obj = {list:data}
    res.render("manage_slider.ejs" , obj)
})





app.post("/save_slider" ,async function(req , res){  
    var fileName = req.files.slider_image.name
    req.files.slider_image.mv('public/uploads/'+fileName)

    // Create Table Quary
    // await execute(`CREATE TABLE slider(slider_id INT PRIMARY KEY AUTO_INCREMENT  , slider_image TEXT , slider_caption  TEXT , slider_link TEXT , slider_text VARCHAR(100))`)


    // Insert Quary
    var data = req.body
    await execute(`INSERT INTO slider(slider_image , slider_caption , slider_link , slider_text) VALUES ('${fileName}' , '${data.slider_caption}' , '${data.slider_link}' , '${data.slider_text}' )`)

    res.redirect("/manage_slider")
})




// Catch image for Edit Slider Image Quary

app.get("/edit_slider/:id" ,async function(req , res){

    var id = req.params.id
    var data = await execute(`SELECT * FROM slider WHERE slider_id = '${id}'`)
    var obj = {'info':data[0]}
    res.render("edit_slider.ejs" , obj)
})


//  Update Quary For Slider Image Update

app.post("/update_slider", async function(req, res) {
    
    var d = req.body

    // Check if image is uploaded
    if (req.files && req.files.slider_image) {
        
        var fileName = req.files.slider_image.name
        req.files.slider_image.mv('public/uploads/' + fileName)

        var UpdateQuary = `UPDATE slider SET slider_image = '${fileName}' WHERE slider_id = '${d.slider_id}'`;
        await execute(UpdateQuary)
    }

    var UpdateQuarySlider = `UPDATE slider SET slider_caption = '${d.slider_caption}' , slider_link = '${d.slider_link}' , slider_text = '${d.slider_text}' WHERE slider_id = '${d.slider_id}' `;
    await execute(UpdateQuarySlider)

    res.redirect("/manage_slider")
})



//  Quary For Delete 


app.get("/delete_slider/:id" , function(req , res){
    var id = req.params.id
    var DeleteQuary = `DELETE FROM slider WHERE slider_id = '${id}'`
    execute(DeleteQuary)
    res.redirect("/manage_slider")
})


app.listen(3000)