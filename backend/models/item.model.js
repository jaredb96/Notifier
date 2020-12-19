const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 const itemSchema = new Schema({
     url : {
         type: String
     },

     phoneNumber : {
         type: String
     }
 })

 const Item = mongoose.model('Item', itemSchema);
 module.exports = Item;