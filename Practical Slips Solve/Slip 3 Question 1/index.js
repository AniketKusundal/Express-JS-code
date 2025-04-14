// Write a program using node js create eLearning System. Create different routes in 
// express.js (Student, Course). 


const express = require('express')
const app = express()



app.get("/", (req , res)=>{
    res.render("home.ejs")
})

app.get("/student" , (req , res)=>{
    res.render("student.ejs")
})
app.get("/Course" , (req , res)=>{
    res.render("course.ejs")
})

app.listen(3000)