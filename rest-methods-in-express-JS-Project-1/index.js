// Entry point index.js


// introduction to rest methods in the Express.js


const express = require('express')
const app = express()



// [1] Get Method

app.get('/', (request , response)=>{
    response.send("Get Method Is called");
    response.end("")
})



// [2] Post Method

app.post('/post', (request , response)=>{
    response.send("Post Method Is called")
    response.end("")
})




// [3] Put Method

app.put('/', (request , response)=>{
    response.send("Put Method Is called")
    response.end("")
})




// [4] Patch Method
app.patch('/', (request , response)=>{
    response.send("Patch Method Is called")
    response.end("")
})



// [5] Delete Method

app.delete('/', (request , response)=>{
    response.send("Delete Method Is called")
    response.end("")
})



app.listen(3001)
console.log("Server Started at PORT 3001");