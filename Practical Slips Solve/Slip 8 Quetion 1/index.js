//  Write a program in Node JS for creating student database, Create Collections ‘UG’ and 
// ‘PG’ and insert documents in both the collections using mongoose schema



const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/studentDB', {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

.then(()=> console.log("Connected To MongoDB"))
.catch(err=>console.log("Connection error" , err))



// Create UG and PG Schema 

const ugShema = new mongoose.Schema({
    name:String,
    age:Number,
    stream:String,
    percentage:Number
})


const UG = mongoose.model('UG' , ugShema)


const pgShema = new mongoose.Schema({
    name:String,
    age:Number,
    stream:String,
    percentage:Number
})


const PG = mongoose.model('PG' , pgShema)



const UgShema = [
    {name:'sunny' , age:22 , stream:'CS' , percentage:80 },
    {name:'anik' , age:23 , stream:'CSE' , percentage:40 },
    {name:'sunil' , age:24 , stream:'CA' , percentage:90 },
    {name:'jack' , age:23 , stream:'CA' , percentage:60 }

]


const PgShema = [
    {name:'sun' , age:32 , stream:'CS' , percentage:80 },
    {name:'ani' , age:31 , stream:'CSE' , percentage:40 },
    {name:'suni' , age:24 , stream:'CA' , percentage:90 }
]




async function InserData() 
{
    try 
    {
       
            await UG.insertMany(ugShema);
            await PG.insertMany(PgShema)

            console.log('UG and PG student data inserted successfully!');
            mongoose.connection.close(); // Close DB connection
    } 
    catch (error) 
    {
        console.log("Data Can't Inserted " , error)   
    }    
}

InserData()