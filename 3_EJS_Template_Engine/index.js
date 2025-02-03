var express = require('express')
var app = express()



app.get("/" , function(req , res){

    // this is a middelware 
        app.use(express.static('public/'))
        //---> is a middleware function in Express that serves static files (like images, CSS, JavaScript files, etc.) from the public/ directory

        // ---> When you use express.static(), Express automatically looks for files in the specified folder (public/) and serves them without needing additional routes

        // ---> Instead of writing separate routes for every CSS, JS, or image file, express.static() makes them available automatically.

    res.render('home.ejs')
})



app.get("/about" , function(req , res){
        app.use(express.static('public/'))
        res.render('About.ejs')
})


app.listen(2000);