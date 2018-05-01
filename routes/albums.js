const express = require('express');
const router = express.Router();
const models = require('./../data/models');

router.get('/', function (req, res, next) {

    models.Album.find().exec()
    .then(results => {
        res.json(results.map(result => {
            return {
                id: result._id,
                title: result.title,
                artistId: result.artistId,
                releaseDate: result.releaseDate
            };
        }));
    });

});

module.exports = router;
