var express = require('express')
var app = express()

app.get('/' , function(req ,res){

    // res.writeHead(200 , {'content-type' : 'text/html'})
    // res.write("<h1>Hello Welcome Back</h1>")
    // res.end()

    //-->>>> insted of write below this three line we simply use the  res.send()  to render the content

    res.send("<h1>Hello Welcome Back</h1>")
})
app.get('/about' , function(req ,res){

    res.send("<h1>Hello Welcome Back To About</h1>")
})

app.listen(2000)