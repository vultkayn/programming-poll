var router = require('express').Router();

const { checkAuth } = require('../passport/authenticate');
const { body } = require('express-validator');
const { validateSanitization } = require('../sanitizers');
const userController = require('../controllers/usersController');

// router.post('/', signup);

router.put('/',
  body('univID').escape().notEmpty(),
  validateSanitization,
  checkAuth(),
  userController.update
);


router.get('/', checkAuth(), userController.detail);


module.exports = router;