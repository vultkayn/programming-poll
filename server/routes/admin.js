var router = require('express').Router();

const {hasAccess, ACCESS} = require ('../passport/authenticate');


router.use('/', hasAccess(ACCESS.R | ACCESS.W, (err, success, info) => {
    if (err) next(err);
    else if (!success) res.sendStatus(404)
    else next()
}))

router.post('/users/edit', 
    (req, res, next) => {
        next();
    }
);


module.exports = router;