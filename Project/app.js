var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongojs = require('mongojs');
var app = express();

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


//Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

// Global vars
app.use(function(req, res, next){
    res.locals.errors = null;
    next();
})

app.use(expressValidator());

app.get('/', function(req,res){
    res.render('index', {});
});

app.get('/add', function(req,res){
    res.render('add', {});
});

app.listen(3000, function(){
    console.log('Server started on Port 3000...');
});