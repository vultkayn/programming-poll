var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('api entry point', { title: 'Express' });
});

router.use('/users', require('./users'));
router.use('/connect', require('./connect'));
router.use('/exercises', require('./exercises'));

module.exports = router;
