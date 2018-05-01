const express = require('express');
const router = express.Router();
const models = require('./../data/models');

router.get('/', function (req, res, next) {

    models.Artist.find().exec()
    .then(results => {
        res.json(results.map(result => {
            return {
                id: result._id,
                name: result.name
            };
        }));
    });
});

module.exports = router;
