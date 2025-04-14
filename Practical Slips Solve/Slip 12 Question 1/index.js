// Write a program in Node JS for bus database. Create Collections ‘bus-depo’ and ‘busroute’ and insert documents in both the collections using mongoose schema. Find the 
// count of buses whose route is ‘Pune to Satara’. 
// Import mongoose
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/busDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected To DB"))
  .catch((error) => console.log("❌ Connection error", error));

// ----------------------
// Bus Depo Schema & Model
// ----------------------
const busDepoSchema = new mongoose.Schema({
  depoName: String, // corrected key from 'denoName' to 'depoName'
  location: String,
  totalBuses: Number
});

const BusDepo = mongoose.model('bus-depo', busDepoSchema);

// ----------------------
// Bus Route Schema & Model
// ----------------------
const busRouteSchema = new mongoose.Schema({
  routeNumber: String,
  from: String,
  to: String,
  distance: Number,
  depo: String
});

const BusRoute = mongoose.model('bus-route', busRouteSchema);

// ----------------------
// Sample Data
// ----------------------
const depos = [
  { depoName: "Shivajinagar", location: "Pune", totalBuses: 150 },
  { depoName: "Swargate", location: "Pune", totalBuses: 100 },
];

const routes = [
  { routeNumber: "101", from: "Pune", to: "Satara", distance: 120, depo: "Shivajinagar" },
  { routeNumber: "102", from: "Pune", to: "Satara", distance: 120, depo: "Swargate" },
  { routeNumber: "103", from: "Pune", to: "Mumbai", distance: 150, depo: "Swargate" },
  { routeNumber: "104", from: "Pune", to: "Satara", distance: 120, depo: "Shivajinagar" },
  { routeNumber: "105", from: "Pune", to: "Nashik", distance: 220, depo: "Swargate" },
];

// ----------------------
// Insert Data and Count Route
// ----------------------
async function insertData() {
  try {
    await BusDepo.insertMany(depos);
    await BusRoute.insertMany(routes);
    console.log("✅ Data Inserted");

    const count = await BusRoute.countDocuments({ from: "Pune", to: "Satara" });
    console.log(`🚌 Number of buses from Pune to Satara: ${count}`);

    mongoose.connection.close();
  } catch (error) {
    console.log("❌ Error", error);
  }
}

insertData();
