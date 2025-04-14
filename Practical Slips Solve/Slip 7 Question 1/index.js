const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/busDB', {
    useNewUrlParser:true,
    useUnifiedTopology:true
})


.then(()=>console.log("Conncted to Db"))
.catch(()=>console.log("Connection Error"))


const busDepoSchema = new mongoose.Schema({
    depoName:String,
    location:String,
    capacity:Number
})


const BusDepo = mongoose.model('bus-depo' , busDepoSchema)


const busSchema = new  mongoose.Schema({
    busRoute:Number,
    from:String,
    to:String,
    distance:Number,
    depo:String
})

const busModel = mongoose.model('bus-route' , busSchema)


const depos = 
[
    {depoName:'shivaji Nagar' , location:'Pune', capacity:50},
    {depoName:' Swargate' , location:'Pune', capacity:50},
    {depoName:'shivaji Nagar' , location:'Pune', capacity:50},
    {depoName:'Katraj' , location:'Pune', capacity:50},
    {depoName:'Deccan' , location:'Pune', capacity:50},
    {depoName:'Karve nagar' , location:'Pune', capacity:50},
    {depoName:'shivaji Nagar' , location:'Pune', capacity:50},
];

const routes = 
[
    { busRoute: '101', from: 'Pune', to: 'Mumbai', distance: 150, depo: 'Shivaji Nagar' },
    { busRoute: '203', from: 'Pune', to: 'Nashik', distance: 210, depo: 'Swargate' },
    { busRoute: '24', from: 'Pune', to: 'Nashik', distance: 210, depo: 'Katraj' },
    { busRoute: '22', from: 'Pune', to: 'Nashik', distance: 210, depo: 'Swargate' },
    { busRoute: '2024', from: 'Pune', to: 'parbahni', distance: 210, depo: 'Deccan' },
    { busRoute: '222', from: 'Pune', to: 'warje', distance: 210, depo: 'Swargate' }
];

async function InsertBusData() {
    try 
    {
        await BusDepo.insertMany(depos)
        await busModel.insertMany(routes)


        console.log("Bus ROute and Depo Data Inserted Succesfully");
        mongoose.connection.close()
    } 
    catch (err) 
    {
        console.log("Not Inserted The Data" , err);
    }
}

InsertBusData()