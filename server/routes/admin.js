var router = require('express').Router();

const {hasAccess, ACCESS} = require ('../passport/authenticate');


router.post('/users/edit', 
    hasAccess(ACCESS.R | ACCESS.W, (err, success, info) => {
        if (err)
    }),
    
    (err, req, res, next) => {
        if (err && err.status == 400)
            res.redirect(307, '/signup');
        else next(err.errors || err);
    }
);


module.exports = router;