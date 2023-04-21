var router = require('express').Router();

router.post('/', (req, res, next) => {
    res.json('Connection to user');
    // if user already exists (conflict of email or univID)
    // res.status(409).send()
});


module.exports = router;