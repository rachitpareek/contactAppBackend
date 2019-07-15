var express = require('express');
var router = express.Router();

const Contact = require('../models/contacts');

//Getting information 
router.get('/contacts', function(req, res, next){
    Contact.find(function(err, contacts) {
        res.json(contacts);
    })
});

//Adding info
router.post('/contact', function(req, res, next){
    let newContact = new Contact({
        first_name: req.body.first_name, 
        last_name: req.body.last_name,
        phone: req.body.phone
    });
    newContact.save((err, contact) => {
        if (err)
        {
            res.json({msg: 'Failed to add contact'});
        } else {
            res.json({msg: 'Contact added succesfully!'});
        }
    });
});

//Delete by referring to a contact by ID
router.delete('/contacts/:id', function(req, res, next){
    Contact.remove ({_id: req.params.id}, function(err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

//Should soon add an update feature

module.exports = router;