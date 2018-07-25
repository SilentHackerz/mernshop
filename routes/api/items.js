const express = require('express');
const router = express.Router();

// Item model
const Item = require('../../models/Item')

router.get('/', (req, res, next) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items));
        // res.render('index', { title: 'Hello Paul' })
})

router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    })

    newItem.save()
        .then(item => res.json(item))
})

module.exports = router;

/* router.post => What is being posted here, is coming from my front end ..actions/itemActions.js  - from within the function addItem from the line
< payload: res.data >

And the router here, after receiving that payload, is saving that data into mongo with newItem.save

*/