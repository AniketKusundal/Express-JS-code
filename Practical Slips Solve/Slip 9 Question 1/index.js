const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/teacherDB' , {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

.then(()=>console.log("connected to DB"))
.catch(()=>console.log("connection error"))


// teacher schma

const teacherShema = new mongoose.Schema({
    tno:Number,
    tname:String,
    subject:String
})


//  teacher model

const Teacher = mongoose.model('Teacher' , teacherShema)


const teachers = [

    {tno: 1 , tname: 'addi' , subject: 'Java'},
    {tno: 2 , tname: 'jack' , subject: 'Python'},
    {tno: 3 , tname: 'que' , subject: 'C'},
    {tno: 4 , tname: 'rack' , subject: 'C++'},
    {tno: 5 , tname: 'rokc' , subject: 'Web Devlopment'},
    {tno: 6 , tname: 'rock' , subject: 'Java'},
    {tno: 7 , tname: 'nonno' , subject: 'Java'}
]



async function HandelTeacher() {
    try 
    {
        await Teacher.deleteMany({});



        await Teacher.insertMany(teachers)
        console.log("Teacher Inserted");


        // find techer teaching Java

        const JavaTeacher = await Teacher.find({subject:'Java'});
        console.log("Teacher Teaching Java" , JavaTeacher);
        


        mongoose.connection.close();
    } 
    catch (error) 
    {
        console.log("Error" , error);
        
    }
}

HandelTeacher()