var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/', function(req, res, next){
    res.render('index.html');
});

router.get('/jiggy', function(req, res, next){
    res.send('index.html');
});

router.get('/data', function(req, res, next){
    userData.find().then( (data) =>
        {
          res.render('html', {items: data});  
        }
    )
});

module.exports = router;