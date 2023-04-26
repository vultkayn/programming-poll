var router = require('express').Router();

const {connexion, signup} = require ('../passport/authenticate');

router.post('/signup', signup, (err, req, res, next) => {
    if (err && err.status == 400)
        res.redirect(307, '/signup');
    else next(err.errors || err);
});

router.post('/login', connexion, (err, req, res, next) => {
    if (err && err.status == 400)
        res.redirect(307, '/login');
    else next(err.errors || err);
});


module.exports = router;