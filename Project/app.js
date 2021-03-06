var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongojs = require('mongojs');
var db = mongojs('warehouse', ['items']);
var app = express();
var ObjectId = mongojs.ObjectId;

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
    db.warehouse.find(function(err, docs){
    res.render('index', {
        items:docs
    });
    })
});
 
app.get('/add', function(req,res){
    res.render('add', {});
});
 
app.get('/edit/:_id', function(req,res){
    db.warehouse.findOne({"_id": ObjectId(req.params._id)}, function(err, itemInDB){
         res.render('edit',{
            itemInDB:itemInDB
         })
    })

});

app.post('/save/:_id', function(req, res){
    var update = {name:'laa'};
    db.warehouse.updateOne({"_id": ObjectId(req.params._id)}, {$set:req.body}, {upsert:true}, function(err, itemInDB){
        if(err){
            throw err;
        }
        res.redirect('/');
    });
    
})

app.post('/add', function(req,res){
    
    req.checkBody('name', 'Name is Required').notEmpty();
    req.checkBody('description', 'Description is Required').notEmpty();
    req.checkBody('code', 'Item code is Required').notEmpty();
    req.checkBody('quantity', 'Quantity is Required').notEmpty();
    req.checkBody('weigh_per_item', 'Weigh is Required').notEmpty();
    var errors = req.validationErrors();

    if(errors){
        res.render('add', {
            errors: errors
        });
    }else{
        var newItem = {
            name: req.body.name,
            description: req.body.description,
            code: req.body.code,
            quantity: req.body.quantity,
            weigh: req.body.weigh_per_item,
            location: req.body.location
        }
        db.warehouse.insert(newItem, function(err, result){
            if(err){
                console.log(err);
            }
            res.redirect('/');

        });
    }
});


app.listen(3000, function(){
    console.log('Server started on Port 3000...');
});

app.delete('/delete/:id', function(req, res){
    db.warehouse.remove({_id: mongojs.ObjectId(req.params.id), function(err, result){
        if(error){
            console.log(err);
        }
        res.redirect('/');
    }});
})