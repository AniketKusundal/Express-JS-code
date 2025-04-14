const mongoose = require('mongoose')

// connect to mongoDB

const db = mongoose.connect('mongodb://127.0.0.1:27017/movieDB', {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

.then(()=> console.log("Connect to MongoDB"))
.catch(()=>console.log("No connect To MongoDb"))




//  actor schema 
const actorSchema = new mongoose.Schema({
    name:String,
    age:Number,
    film:[String]
})


//  film schema 
const filmSchema = new mongoose.Schema({
    title:String,
    year:Number,
    genre:[String]
})


const Film = mongoose.model('Film', filmSchema);
const Actor = mongoose.model('Actor', actorSchema);


const films = [

    new Film({title:'Inc' , year:2003 , genre:'sci-fi'}), 
    new Film({title:'Inc2' , year:2005 , genre:'sci-fi'}),
    new Film({title:'Inc3' , year:2007 , genre:'sci-fi'}) 
]


const actor = [

    new Actor({name:'aniket', age:22, films:['Inc' , 'Inc2']}),
    new Actor({name:'aniket', age:22, films:['Inc' , 'Inc2']}),
    new Actor({name:'aniket', age:22, films:['Inc' , 'Inc2']})
]


async function InsertData()
{
    try 
    {
        await Film.deleteMany({})
        await Actor.deleteMany({})   



        // Insert

        await Film.insertMany(films)
        await Actor.insertMany(actor)

        console.log("Inserted Into DB");

        mongoose.connection.close()
    } 
    catch (error) 
    {
        console.log("error inserting documents" , error);
    }
}

InsertData()