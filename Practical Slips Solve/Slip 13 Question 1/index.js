// .1 Write a query on Movie Database, Create Collections ‘Actor’ and insert documents in 
// the collections using mongoose schema to find out how many actors in the database were 
// born in California? 

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/MovieDB',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

.then(()=>console.log("Connected to DB"))

.catch((error)=>console.log("Connection Error " , error))



const ActorShema = new mongoose.Schema({
    name:String,
    location:String,
    age:Number
})
const ActorModel = mongoose.model('actor-data' , ActorShema)
const SampelActor = [
    {name:"aniket" , location:"California" , age:22},
    {name:"jack" , location:"India" , age:42},
    {name:"lack" , location:"India" , age:54},
    {name:"vack" , location:"Dubai" , age:23},
    {name:"ogg" , location:"USA" , age:22},
    {name:"oggy" , location:"ABUDABI" , age:22},
    {name:"jhon" , location:"California" , age:34},
    {name:"rock" , location:"California" , age:33},
    {name:"rack" , location:"California" , age:51},
    {name:"vvan" , location:"California" , age:20}
]
async function ActorInfo() 
{
    try 
    {
        await ActorModel.insertMany(SampelActor)    
        console.log("Inserted Succesfully");  
        const count = await SampelActor.countDocuments({ location: "California" });
        console.log(`\nNumber of actors born in California: ${count}`);
    } 
    catch (error)
    {
        console.log("Error in Inserting data ")
    }   
}
ActorInfo()