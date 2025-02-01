const express = require("express")
const app = express()

app.get("/" , function(req , res){
    res.writeHead(200 , {'content-type' : 'text/html'})
    res.write('<h1>Hello Aniket From Express...</h1>')
});

app.listen(8000 , (err)=>{
    if(err) throw err
    console.log("Express Server is Runing......");
    
})