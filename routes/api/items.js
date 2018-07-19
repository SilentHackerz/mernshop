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