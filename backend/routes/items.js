var express = require('express');
var router = express.Router();
let Item = require('../models/item.model');



router.route('/').get((req, res) => {
    Item.find()
    .then(items => res.json(items)).
    catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const url = req.body.url;
    const phoneNumber = req.body.phoneNumber;

    const newItem = new Item({url, phoneNumber});
    newItem.save()
    .then(() => res.json('Item added!'))
    .catch(err => res.status(400).json('Error: ' + err));


})
module.exports = router;