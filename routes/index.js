const express = require('express');
const router = express.Router();
const models = require('./../data/models');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({
    artists: {
      route: '/artists',
      params: [
        { name: 'pretty', type: 'boolean' }
      ]
    },
    albums: {
      route: '/albums',
      params: [
        { name: 'artistId', type: 'string' },
        { name: 'page', type: 'int' },
        { name: 'limit', type: 'int' },
        { name: 'pretty', type: 'boolean' }
      ]
    }
  });
});

module.exports = router;
