var router = require('express').Router();

const {connexion, signup} = require ('../passport/authenticate');

router.post('/signup', signup, (err, req, res, next) => {
    if (err && err.status == 400)
        res.redirect(307, '/signup');
    else next(err.errors || err);
});

router.post('/login', connexion, (err, req, res, next) => {
    if (err && err.status == 401)
        res.status(401).json(err.errors); //redirect(307, '/'); // FIXME redirect to '/login' once react.router is setup
    else next(err.errors || err);
});


module.exports = router;