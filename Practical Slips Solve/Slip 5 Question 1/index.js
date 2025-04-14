//  Write Node JS script to interact with the file system, and serve a web page. 

const http = require('http')
const path = require('path')
const fs = require('fs')
const { text } = require('stream/consumers')


const server = http.createServer((req , res)=>{
    if (req.url === '/') {
        const filePath = path.join(__dirname , 'home.html')




        fs.readFile(filePath , (err , data)=>{

            if (err) {
                res.writeHead(500 , {'content-type' : 'text/plain'})
                res.end("error loading html file")
            }
            else
            {
                res.writeHead(500 , {'content-type':'text/plain'})
                res.end(data)
            }
        })
    }
    else
    {
        res.writeHead(500 , {'content-type':'text/plain'})
        res.end("404 not found")
    }
})


server.listen(3000)