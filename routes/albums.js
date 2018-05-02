const express = require('express');
const router = express.Router();
const models = require('./../data/models');
const _ = require('lodash');

router.get('/', function (req, res, next) {

    let query = {    };

    if (req.query.artistId){
        query.artistId = req.query.artistId
    }

    const limit = parseInt(req.query.limit) || 10;
    const skip = (parseInt(req.query.page) || 0) * limit;

    let options = {
        skip,
        limit
    };

    models.Album.find(query, null, options).exec()
        .then(results => {
            const mapped = results.map(result => {
                return {
                    title: result.title,
                    artistId: result.artistId,
                    releaseDate: result.releaseDate,
                    tracks: result.tracks
                };
            });
            return res.json(_.sortBy(mapped, item => item.releaseDate));
        });
});

module.exports = router;
