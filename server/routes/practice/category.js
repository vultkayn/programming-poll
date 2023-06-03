var express = require('express');
var router = express.Router();

const catCtrl = require('../../controllers/categoryController');

router.post('/', catCtrl.create);
router.get('/:path', catCtrl.detail);
router.delete('/:path', catCtrl.delete);
router.put('/:path', catCtrl.update);


router.use('/:path/ex/', require('./exercise'));

module.exports = router;