const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const twilio = require('twilio')

// Connects to database.
const mongoose = require('mongoose');

// Local environment variables config.
require('dotenv').config();

// Express server
const app = express();
const port = process.env.PORT || 5000;

// Middleware for cors and express
app.use(cors());
app.use(express.json());

// Connect to database.
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongo database connection established successfully.");
});

// Route for adding items to the database.
const addItemRouter = require('./routes/items');
app.use('/items', addItemRouter);
// Starts server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

async function scrapeAmazon(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const stock = await page.evaluate(() => {
        let inStockText = document.querySelector('#availability > span').innerText;
        return inStockText === 'In Stock.';
    });
    
    browser.close();
    return stock;
}

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const sendNumber = process.env.TWILIO_NUMBER;
const client = twilio(accountSid, authToken);

function sendText(phoneNumber){
    const  message = 'This item is now in stock!';
    client.messages.create({
        body: message,
        from: sendNumber,
        to: phoneNumber
    })
}

let Item = require('./models/item.model');
Item.find(function (err, items) {
    if (err){
        return console.error(err);  
    }
    for (i = 0; i < items.length; i++){
        isInStock = scrapeAmazon(items[i]['url']);
        if (isInStock){
            // Remove item from database.
            itemID = items[i]['_id'];
            Item.deleteOne({ '_id': itemID }, function (err) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log('Deleted successfully!')
                }
            });

            // Send text to user indicating that item is in stock.
            userNumber = items[i]['phoneNumber'];
            sendText(userNumber);
        }
    }
  }
  )

