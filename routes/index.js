var express = require('express');
var router = express.Router();
XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var d3 = require('d3');
//var MG = require('metrics-graphics');
var jsondata;

//d3.csv('http://localhost:3000/file.csv', function(error,data) {
//    if (error) return console.warn(error);
////    data = MG.convert.date(data, 'date');
////    console.log(data);
//    jsondata = data;
//});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Wearable Living Lab Analysis tool', data: jsondata,scripts:['javascripts/metricsgraphics.js','javascripts/graph.js']});
});

module.exports = router;
