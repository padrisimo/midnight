var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Set static Path
app.use(express.static(path.join(__dirname, 'public')))

var users = [
    {
        id:1,
        first_name: 'Manolo',
        last_name: 'Escobar',
        email: 'escobar@gmail.com'
    },
    {
        id:2,
        first_name: 'Pedro',
        last_name: 'Picapiedra',
        email: 'rocadura@gmail.com'
    },
    {
        id:1,
        first_name: 'Lola',
        last_name: 'Flores',
        email: 'simequereisirsen@gmail.com'
    }
]

app.get('/', function(req, res){
    res.render('index', {
        title: 'Passengers',
        users: users
    });
})

app.listen(3000, function(){
    console.log("Train departs from platform 3000")
})
