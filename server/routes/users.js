var router = require('express').Router();

const {loggedIn} = require('../passport/authenticate');
const {param} = require('express-validator');
const {validateSanitization} = require('../sanitizers');
const User = require('../models/userModel');

// router.post('/', signup);

router.get('/:univID',
  param('univID').escape(),
  validateSanitization,
  loggedIn,
  (req, res, next) => {
    // TODO add test for deleted identity
    User.findById(req.user.id)
      .then((user) => {        
        res.json({
            promo: user.promo,
            identity: user.identity
        });
      })

    // if requested user was not found
    // res.status(404).json('user not found');
});

router.put('/', (req, res, next) => {
  // if (validate(req.body, EAUTH.userRW) === false)
    // res.status(403).json('Insufficient permissions.');
});


module.exports = router;