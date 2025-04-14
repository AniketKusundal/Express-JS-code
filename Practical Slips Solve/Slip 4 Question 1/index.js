const http = require('http')
const fs = require('fs')
const path = require('path')



const server = http.createServer((req , res)=>{
    if (req.url === "/") {
        const filePath = path.join(__dirname , "home.html")



        fs.readFile(filePath ,(err , data)=>{
            if (err)
            {
                res.writeHead(500 , {"content-type" : "text/plain"})
                res.end("Error Loading html file")
            }
            else
            {
                res.writeHead(200 , {"content-type" : "text/plain"})
                res.end(data)
            }

        })
    }
    else
    {
        res.writeHead(404 , {"content-type" : "text/plain"})
        res.end("Page is not Found 404")
    }
})



server.listen(3000)