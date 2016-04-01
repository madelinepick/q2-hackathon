'use strict'
var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);
var bcrypt = require('bcrypt');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/app', function(req, res, next) {
  console.log('test /app', req.session.userID);
  knex('users').where({
    id: req.session.userID
  }).first().then(function(record){
    if(record){
        res.render('app', {name: record.username});
    }else{
      res.redirect('/');
    }
  })
});

router.post('/login', function(req, res, next) {
  knex('users').where({
        username: req.body.username,
    }).first().then(function(user) {
        if ( user && bcrypt.compareSync(req.body.password, user.password) ) {
            req.session.userID = user.id;
            res.redirect('/app');
        } else {
            res.redirect('/');
        }
    });
});

router.post('/signup', function(req, res, next) {
var errorArray = [];

if(!req.body.username){
  errorArray.push("Please enter a name")
}
if(typeof(req.body.username) != "string"){
  errorArray.push("Please enter a name with no numbers")
}
if(!req.body.password){
  errorArray.push("Please enter a password")
}
if(errorArray.length > 0){
    res.render('index', {errors: errorArray, diplay: "true", name:req.body.username, hobby:req.body.password});
  }

  knex('users').where({
        username: req.body.username
    }).first().then(function(user) {
        if (!user) {
            req.session.userID = null;
            let hash = bcrypt.hashSync(req.body.password, 10);
            knex('users').insert({
                username: req.body.username,
                password: hash,
                role_id: req.body.role
            }).returning('id').then(function(userID){
              console.log(userID);
              req.session.userID = userID[0];
              res.redirect('/app');
            }).catch(function (err) { console.log(err);});
        } else {
            res.redirect('/');
        }
    });
});

router.get('/logout', function(req,res,next){
  req.session.userID = null;
  res.redirect('/');
});



module.exports = router;
