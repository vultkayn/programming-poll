var router = require('express').Router();
const { validate, EAUTH } = require('../authenticate'); 

router.post('/', (req, res, next) => {
    res.send('Creation of an user');
    // if user already exists (conflict of email or univID)
    // res.status(409).send()
});

router.get('/', (req, res, next) => {
  if (validate(req.body) === false)
    // if authentification failed.
    res.status(403).json('authentification failed');

  res.json({
      "firstName": "toto",
      "lastName": "titi",
      "univID": "benpr438",
      "promo": 2024,
      "email": "benpr438@student.liu.se"
  });
  // if requested user was not found
  // res.status(404).json('user not found');
});

router.put('/', (req, res, next) => {
  if (validate(req.body, EAUTH.userRW) === false)
    res.status(403).json('Insufficient permissions.');
});


module.exports = router;