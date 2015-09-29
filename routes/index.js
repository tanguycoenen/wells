var express = require('express');
var router = express.Router();
var d3 = require('d3');
var jsondata;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Wearable Living Lab Analysis Platform', data: jsondata,scripts:['javascripts/metricsgraphics.js','javascripts/graph.js']});
});

module.exports = router;
