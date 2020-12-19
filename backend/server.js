const express = require("express");
const cors = require("cors");
const twilio = require("twilio");
const amazonScraper = require("./scrapers/amazon-scraper");

const TEN_SECONDS = 10000; // in milliseconds

// Local environment variables config.
require("dotenv").config();

function main(){
    init();
    setInterval(checkDatabase, TEN_SECONDS);
    console.log('backend running');
}

function init(){
    // Express server
    const app = express();
    const port = process.env.PORT || 5000;

    // Middleware for cors and express
    app.use(cors());
    app.use(express.json());

    // Connect to database.
    const uri = process.env.ATLAS_URI;

    // Connects to database.
    const mongoose = require("mongoose");   
    mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    });

    const connection = mongoose.connection;
    connection.once("open", () => {
    console.log("Mongo database connection established successfully.");
    });

    // Route for adding items to the database.
    const addItemRouter = require("./routes/items");
    app.use("/items", addItemRouter);
    // Starts server
    app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    });
}

function checkDatabase() {
  let Item = require("./models/item.model");

  Item.find(function (err, items) {
    if (err) {
      return console.error(err);
    }
    console.log("Connected Successfully");
    for (var i = 0; i < items.length; i++) {
      let isInStock = amazonScraper.scrapeAmazon(items[i]["url"]);
      if (isInStock) {
        // Remove item from database.
        let itemID = items[i]["_id"];
        let userNumber = items[i]["phoneNumber"]; // get number before calling delete
        Item.deleteOne({ _id: itemID }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Deleted successfully!");
          }
        });

        // Send text to user indicating that item is in stock.
        sendText(userNumber);
      }
    }
  });
}

function sendText(phoneNumber) {
    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.AUTH_TOKEN;
    const sendNumber = process.env.TWILIO_NUMBER;
    const client = twilio(accountSid, authToken);

    const message = "This item is now in stock!";
    client.messages.create({
      body: message,
      from: sendNumber,
      to: phoneNumber,
    });
}

main();