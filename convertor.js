/**
 * Created by tanguycoenen on 19/09/15.
 */
//Converter Class
var fs = require("fs");
var Converter = require("csvtojson").Converter;
var fileStream = fs.createReadStream("./file.csv");
//new converter instance
var param={};
var converter = new Converter(param);

//end_parsed will be emitted once parsing finished
converter.on("end_parsed", function (jsonObj) {
    console.log(jsonObj); //here is your result json object
});

//read from file
fileStream.pipe(converter);