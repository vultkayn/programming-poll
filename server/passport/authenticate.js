const {body} = require('express-validator');

const passport = require("passport");
const {validateSanitization} = require('../sanitizers');
const User = require('../models/userModel');

const passportCall = (name) => (req, res, next) => {
    return passport.authenticate(name, function(err, user, info) {
        let errors;
        if (err) errors = err;
        else if (!user) errors = {status: info.status, errors: {message: info.message || info}};
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
    body('password').notEmpty(),
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
    else next({status: 401, message: "Not logged in"});
};

// done is a callback that should be provided, function(err: Any, hasAccess: boolean, info?: Any)
// required is a bit field of required access rights.
exports.hasAccess = (required, user, done) => (req, res, next) =>{
    if (!user)
        return done(null, false, {message: "User not logged in"});
    User.findById(user.id)
        .then(user => {
            if (!user || !user.auth)
               return done(null, false, {message: "User not found"});
            if (user.auth & required !== required)
                return done(null, false, {message: "Unsufficient permission"})
            return done(null, true)
        })
        .catch((err) => done(err, false))
}

exports.ACCESS = Object.freeze({
    R: 1,
    W: 2,
    X: 4
});