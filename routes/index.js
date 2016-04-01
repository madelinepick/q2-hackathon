var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/app', function(req, res, next) {
  res.render('app');
});

router.post('/signup', function(req, res, next) {
  res.redirect('app');
});

router.post('/login', function(req, res, next) {
  res.redirect('app');
});


module.exports = router;
