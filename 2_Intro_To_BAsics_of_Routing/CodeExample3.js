var express = require('express')
var app = express()


app.get('/' , function(req , res){
    res.render("home.ejs") 
    // The function used to render an HTML view and to send the rendered HTML data to  the client is known as the res. render() function in express
});


app.get('/about.ejs' , function(req , res){
    res.render("about.ejs") 
    
});


app.get('/contact.ejs' , function(req , res){
    res.render("contact.ejs") 
});

app.listen(2000)