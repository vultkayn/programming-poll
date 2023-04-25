const {body, param} = require('express-validator');

const passport = require("passport");
const {validateSanitization} = require('../sanitizers');

const passportCall = (name) => (req, res, next) => {
    return passport.authenticate(name, function(err, user, info) {
        let errors;
        if (err) errors = err;
        else if (!user) errors = {status: info.status, errors: info.message || info};
        if (errors) next(errors);
        else {
            req.logIn(user, function (err) {
                if (err)
                    next({status: err.status, errors: err});
                else
                    res.status(200).json({univID: req.user.identity.univID});
            });
        }
    }) (req, res, next);
};

exports.connexion = [
    body('univID').escape(),
    validateSanitization,
    passportCall('login')
];

exports.signup = [
    body('univID').escape(),
    body('promo').escape(),
    body('lastName').escape(),
    body('firstName').escape(),
    body('email').escape(),
    body('password')
        .isStrongPassword({minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1}),
        // .withMessage('Password should contain at least 1 uppercase, 1 number, 1 symbol'),

    validateSanitization,

    // doesnt handle errors, but do send response if successful after signup.
    passportCall('signup')
];

exports.loggedIn = function (req, res, next) {
    if (req.user) next();
    else res.redirect('/login');
};