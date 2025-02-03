var express = require('express');
var app = express();


app.get("/" , function(request , response)
{
    var obj = {
        "uname" : "ABCD",
        "Mobile" : "1231231230",
        "uname" : "ABCD",
        "Mobile" : "1231231230",
        "uname" : "ABCD",
        "Mobile" : "1231231230",
        "uname" : "ABCD",
        "Mobile" : "1231231230",
        "arr":[1 , 2 , 3 , 4 , 5 , 6],
        "info":{"age":"22" , "DOB":"01-10-2003"},
        "family":{"name":"Aniket" , "Mobile":"12312311220"},
        "family":{"name":"Aniket" , "Mobile":"12312311220"}
    }

    response.render("home.ejs" , obj)
});


app.listen(3000);