var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.get('/', function(req, res){
    res.send('Pasajeros al Tren!')
})

app.listen(3000, function(){
    console.log("Train departs from platform 3000")
})
