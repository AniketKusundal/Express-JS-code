var express = require('express')
var app = express()

app.get('/' , function(req , res){

    //  creating the object and pass we can get the JSON data in the output

    var obj = {"name" : "aniket" , "mobile" : "9876543210" , "email" : "abcd@gmail.com"}
    res.send(obj)
})

app.listen(4000)


// O/P

// {
//     "name": "aniket",
//     "mobile": "9876543210",
//     "email": "abcd@gmail.com"
// }
    