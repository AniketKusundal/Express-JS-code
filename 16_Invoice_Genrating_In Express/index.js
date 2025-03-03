const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const util = require('util')
const app = express()

// Database connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_second'
})

// Middleware for the body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// Middleware for the util for query execution 
var execute = util.promisify(connection.query).bind(connection)

app.get("/", function (req, res) {
    res.render("home.ejs")
})

// create table and Insert Query
app.post("/save_bill", async function (req, res) {

    // Create Table
    // await execute(`CREATE TABLE invoice_generate(bill_id INT PRIMARY KEY AUTO_INCREMENT , bill_date VARCHAR(20) , customer_name VARCHAR(200) )`)

    // Insert Into Table
    var data = req.body;
    var bill = await execute(`INSERT INTO invoice_genrate (bill_date, coustomer_name) VALUES ('${data.bill_date}', '${data.coustomer_name}')`);

    var bill_id = bill.insertId; // Get last inserted ID

    // Ensure product fields are arrays
    let products = Array.isArray(data.product_name) ? data.product_name : [data.product_name];
    let prices = Array.isArray(data.product_price) ? data.product_price : [data.product_price];
    let quantities = Array.isArray(data.product_quantity) ? data.product_quantity : [data.product_quantity];
    let totals = Array.isArray(data.product_total) ? data.product_total : [data.product_total];

    for (let i = 0; i < products.length; i++) {
    
       var Insert_into_product =  await execute(`INSERT INTO bill_products (bill_id, product_name, product_price, product_quantity, product_total) VALUES 
        ('${bill_id}', '${products[i]}', '${prices[i]}', '${quantities[i]}', '${totals[i]}')`);
    }

    // Multiple Data 
    // Create Table for the bill Product 
    // we use here foreign key concept it means one table reference is taken in another table 

    // product_name  , product_price , product_quantity  , product_total

    // for we create table for bill_products

    // execute(`CREATE TABLE bill_products(bill_products_id INT PRIMARY KEY AUTO_INCREMENT , bill_id INT , product_name VARCHAR(200) , product_price INT , product_quantity INT , product_total INT )`);

    res.send("Bill Saves Succesfully")
})
 

//  Bill list table
app.get("/bill_list", async function (req, res) {
    var data = await execute(`
        SELECT *, SUM(product_total) as total  
        FROM invoice_genrate, bill_products  
        WHERE invoice_genrate.bill_id = bill_products.bill_id 
        GROUP BY invoice_genrate.bill_id
    `);
    
    var obj = { 'bills': data };
    res.render("bill_list.ejs", obj);
});



app.listen(2000)



// soome SQL functions 
 //  COUNT  , MIN  , MAX  ,  AVG
