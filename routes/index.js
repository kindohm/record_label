const express = require('express');
const router = express.Router();
const models = require('./../data/models');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ title: 'Express' });
});

module.exports = router;
