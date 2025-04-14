// Q.1 Write a program in Node JS to create ’sign up form’ the fields are (name, email, password, phone). Insert data into database using MongoDB. 


const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()


app.use(bodyParser.urlencoded({extended:true}))



// connect to db
mongoose.connect("mongodb://127.0.0.1:27017/userDB", {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

.then(()=>console.log("Coonected to DB"))
.catch((err)=>console.log("connection Error" , err))


const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone:String
})

const User  = mongoose.model('User' , userSchema)


app.get("/" , (req , res)=>{

    res.render("form.ejs") 
})



app.post("/signup" , async(req , res) =>{

    const {name , email , password , phone} = req.body

    try 
    {
        const user = new User({ name , email , password , phone})
        await user.save()
        res.send("Signup Successfully....") 
    } 
    catch (error) 
    {
        res.status(500).send("Error saving Data" + error)
    }
})
app.listen(3000)