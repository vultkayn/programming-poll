var router = require('express').Router();

router.post('/', (req, res, next) => {
    res.json('Creation of exercise');
    // if user already exists (conflict of email or univID)
    // res.status(409).send()
});


module.exports = router;