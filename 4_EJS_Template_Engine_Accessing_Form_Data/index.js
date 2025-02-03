var express = require("express")
var app = express()
var url = require('url')   //  --> URL Module


app.set("view engine", "ejs");


// sending data to the URL


app.get("/", function (req, res) {
    var UrlData = req.query; // Directly access query parameters
    console.log(UrlData);

    // Render the 'add_student.ejs' view
    res.render("add_student", { data: UrlData });
});







app.listen(3000, () => {
    console.log("Server is running....");
});
