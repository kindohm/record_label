const express = require('express');
const router = express.Router();
const generator = require('./../data/generator');

router.get('/', function (req, res, next) {
    generator.clear().then(generator.generate).then(res.json({}));
});

module.exports = router;
