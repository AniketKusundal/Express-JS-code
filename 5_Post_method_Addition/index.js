const express = require('express')
const bodyParsar = require('body-parser')
var url = require('url')
const app = express()



// Middelware 
app.use(bodyParsar.urlencoded({extended:true}))

app.get('/' , function(req , res){
    res.render('add.ejs')

})

app.post("/addition" , function(req , res){
   var sum = Number(req.body.Num1)+Number(req.body.Num2)
    var obj = {"sum" : sum}
    res.render('output.ejs' , obj)
})


app.listen(1000)