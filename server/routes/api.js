var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('api entry point', { title: 'Express' });
});

router.get('/users', require('./users'));
router.get('/connect', require('./connect'));
router.get('/exercises', require('./exercises'));

module.exports = router;
