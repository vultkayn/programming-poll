var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({msg: 'api entry point',  title: 'bta-poll api' });
});

router.use('/users', require('./users'));
router.use('/auth', require('./auth'));
router.use('/practice', require('./practice'));

router.use('/admin', require('./admin'))

module.exports = router;
