var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Set static Path
app.use(express.static(path.join(__dirname, 'public')))

// Gobal Vars
app.use(function(re, res, next) {
    res.locals.errors = null;
    next();
})

// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.');
        var root = namespace.shift();
        var formParam  = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));


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

app.post('/user/add', function(req, res){

    req.checkBody('first_name', 'First Name is Required').notEmpty();
    req.checkBody('last_name', 'Last Name is Required, ya tu sabeh').notEmpty();
    req.checkBody('email', 'Email Name is Required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('index', {
            title: 'Passengers',
            users: users,
            errors: errors
        });
    } else {
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
        }
        console.log('ou yeaH, success!!!');
    }
});

app.listen(3000, function(){
    console.log("Train departs from platform 3000")
})
