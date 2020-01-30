const express = require('express');
const fs = require('fs');
const handler = require('./handler');
const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    });
});

router.post('/', (req, res) => {
    handler(req, res, 'add', './server/db/userCart.json');
});

router.put('/:id', (req, res) => {
    handler(req, res, 'change', './server/db/userCart.json');
});
// /api/cart/1235 // req.params.id
// /api/cart/?var1='sffsgh'&var2='khsfh' // req.query

module.exports = router;
