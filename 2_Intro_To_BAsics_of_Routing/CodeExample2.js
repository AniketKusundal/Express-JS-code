var express = require('express')
var app = express()

var menu = 
`
    <a href = '/'>Home </a> &nbsp;&nbsp;
    <a href = '/about'>about</a>  &nbsp; &nbsp;
    <a href = '/contact'>contact</a>
`;


app.get('/' , function(req , res){
    res.send(menu+ "<h1>On Home Page<h1>")
});


app.get('/about' , function(req , res){
    res.send(menu+ "<h1>On About Page</h1>")
});


app.get('/contact' , function(req , res){
    res.send(menu+ "<h1>On Contact Page</h1>")
});

app.listen(2000);