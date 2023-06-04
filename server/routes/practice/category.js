var express = require('express');
var router = express.Router();

const catCtrl = require('../../controllers/categoryController');
const {pathParamValidator} = require('../../controllers/validators').practice;

router.post('/', catCtrl.create);
router.use('/:path', pathParamValidator);
router.get('/:path', catCtrl.request);
router.delete('/:path', catCtrl.delete);
router.put('/:path', catCtrl.update);

router.get('/:path/exercises', catCtrl.exercises);
router.get('/:path/subcategories', catCtrl.subcategories);

router.use('/:path/ex/', require('./exercise'));

module.exports = router;