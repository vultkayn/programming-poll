var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('api entry point', { title: 'Express' });
});

router.get('/users', require('./users'));

module.exports = router;
