const express = require('express');
const Routes = express.Router();

const Item = require('../../models/Item')

router.get('/', (req, res) +> {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items));
})