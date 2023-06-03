var router = require('express').Router();

const categoryCtrl = require('../controllers/categoryController');

router.get('/categories', categoryCtrl.list);

router.use('/category', require('./practice/category'));

module.exports = router;