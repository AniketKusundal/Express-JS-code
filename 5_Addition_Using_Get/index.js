const express = require('express')
const url = require('url')
const app = express();

app.get("/" , function(req , res){
    res.render("add.ejs")
})

app.get("/addition" , function(req , res){
    
    var urlData = url.parse(req.url , true).query
    // console.log(urlData)
    var sum = Number(urlData.Num1)+Number(urlData.Num2)
    res.send("Addition = "+sum)
})


app.listen(3000 ,()=>{
    console.log("Server Is Runnning....");
    
})