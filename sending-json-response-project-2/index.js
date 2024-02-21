//  Seleccting Single And Multiple Record Form Server Side

const express = require('express')

const app = express()

const students = [
    {id:100,fname:'aniket'},
    {id:200,fname:'ajju'},
    {id:300,fname:'uday'},
    {id:400,fname:'vikas'}
]

app.get('/student' , (Request , Response)=>{
    Response.json(students)
})

app.get('/Student/:id' , (Request , Response) => {
    const id1  = parseInt(Request.params.id)
    const row = students.find((r)=>r.id === id1)
    console.log(row);


    if (row === undefined) {
        Response.send("Result Not Found")
    } else {
        Response.json(row)
    }
})

app.listen(3001)
console.log("Server is started at Port 3001");