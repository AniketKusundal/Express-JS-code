const mongoose = require('mongoose')

// 1. Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/TCS', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(" Connected to DB"))
.catch(() => console.log(" Connection Error"))

// 2. Define Service Schema and Model
const ServiceSchema = new mongoose.Schema({
    serviceName: String,
    companyName: String,
    Duration: String,
})
const Service = mongoose.model('services', ServiceSchema)

// 3. Define Product Schema and Model
const ProductSchema = new mongoose.Schema({
    ProductName: String,
    companyName: String,
    Duration: String
})
const Product = mongoose.model('product', ProductSchema)

// 4. Data Arrays
const products = [
    { ProductName: "Fan", companyName: "TCS", Duration: "Two Years" },
    { ProductName: "Light", companyName: "TCS", Duration: "Two Years" },
    { ProductName: "Chair", companyName: "Wipro", Duration: "Two Years" },
    { ProductName: "AC", companyName: "TCS", Duration: "Two Years" },
]

const services = [
    { serviceName: "Fitting", companyName: "TCS", Duration: "Two Years" },
    { serviceName: "Fightting", companyName: "TCS", Duration: "Two Years" },
    { serviceName: "Repair", companyName: "Wipro", Duration: "Two Years" },
    { serviceName: "Repair", companyName: "TCS", Duration: "Two Years" },
]

// 5. Insert & Query Function
async function InsertData() {
    try {
        // Insert data
        await Service.insertMany(services)
        await Product.insertMany(products)

        console.log(" Data Inserted")

        // Find products by TCS
        const tcsProducts = await Product.find({ companyName: "TCS" })
        console.log(" Products by TCS:")
        console.log(tcsProducts)

        mongoose.connection.close()
    } catch (error) {
        console.log(" Server Error:", error)
    }
}

InsertData()
