var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

var logger = function(req, res, next){
    console.log('Loggin...');
    next();
}

app.use(logger);

app.get('/', function(req, res){
    res.send('Pasajeros al Tren!')
})

app.listen(3000, function(){
    console.log("Train departs from platform 3000")
})
