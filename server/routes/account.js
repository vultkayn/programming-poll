var router = require('express').Router();

const { connexion, signup, loggedIn } = require('../passport/authenticate');

router.post('/', signup, (err, req, res, next) => {
<<<<<<< HEAD
    if (err && err.status == 400)
        if (err.errors !== undefined)
            res.status(err.status).json({errors: err.errors});
    else next(err.errors || err);
});

router.post('/login', connexion, (err, req, res, next) => {
    if (err && (err.status == 401 || err.status == 400))
        if (err.errors !== undefined)
            res.status(err.status).json({errors: err.errors});
    
    else next(err.errors || err);
=======
  if (err && err.status == 400)
    res.status(400).json(err.errors);
  else next(err.errors || err);
});

router.post('/login', connexion, (err, req, res, next) => {
  if (err && err.status == 401)
    res.status(401).json(err.errors);
  else next(err.errors || err);
>>>>>>> 44e8690 (Added functional router to React. Not all routes have been added already)
});


router.put('/', loggedIn, (err, req, res, next) => {
  if (err && err.status == 401)
    res.redirect(301, '/account/login');
  else next(err.errors || err);
});


router.get('/:id', loggedIn, (err, req, res, next) => {
  if (err && err.status == 401)
    res.redirect(301, '/account/login');
  else next(err.errors || err);
})

module.exports = router;