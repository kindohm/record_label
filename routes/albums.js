const express = require('express');
const router = express.Router();
const models = require('./../data/models');
const _ = require('lodash');

router.get('/', function (req, res, next) {

    let query = {};

    if (req.query.artistId){
        query.artistId = req.query.artistId
    }

    models.Album.find(query).exec()
        .then(results => {
            const mapped = results.map(result => {
                return {
                    id: result._id,
                    title: result.title,
                    artistId: result.artistId,
                    releaseDate: result.releaseDate
                };
            });

            return res.json(_.sortBy(mapped, item => item.releaseDate));
        });

});

module.exports = router;
