var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongojs = require('mongojs');
var db = mongojs('customerapp', ['users']);
var ObjectId = mongojs.ObjectId;


var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Set static Path
app.use(express.static(path.join(__dirname, 'public')))

// Gobal Vars
app.use(function (re, res, next) {
    res.locals.errors = null;
    next();
})

// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.');
        var root = namespace.shift();
        var formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

app.get('/', function (req, res) {
    db.users.find(function (err, docs) {
        res.render('index', {
            title: 'Passengers',
            users: docs
        });
    })
})
app.post('/user/add', function (req, res) {

    req.checkBody('first_name', 'First Name is Required').notEmpty();
    req.checkBody('last_name', 'Last Name is Required, ya tu sabeh').notEmpty();
    req.checkBody('email', 'Email Name is Required').notEmpty();

    var errors = req.validationErrors();
    db.users.find(function (err, users) {
        if (errors) {
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
            db.users.insert(newUser, function (err, result) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/');
            });
        }
    })
});

app.delete('/users/delete/:id', function (req, res) {
    console.log('deleting passenger', req.params.id);
     db.users.remove({_id: ObjectId(req.params.id), function (err) {
        if(err){
            console.log(err);
        }
        res.redirect('/');
    }})
}); 

app.listen(3000, function () {
    console.log("Train departs from platform 3000")
})
