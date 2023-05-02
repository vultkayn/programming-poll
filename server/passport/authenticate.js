const {body, oneOf} = require('express-validator');

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
    oneOf([body('univID').escape().notEmpty(), body('email').escape().isEmail()]),
    body('password').notEmpty(),
    validateSanitization,
    (req, res, next) => {
        if (req.body.univID === undefined)
            req.body.univID = "noneProvided"; 
        next();
    },
    passportCall('login')
];

exports.signup = [
    body('univID').escape().notEmpty(),
    body('promo').escape().isInt({max: 2100, min: 1990}),
    body('lastName').escape().notEmpty(),
    body('firstName').escape().notEmpty(),
    body('email').escape().isEmail(),
    body('password')
        .isStrongPassword({minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1}),

    validateSanitization,

    // doesnt handle errors, but do send response if successful after signup.
    passportCall('signup')
];

exports.loggedIn = function (req, res, next) {
    if (req.user) next();
    else next({status: 401, message: "not logged in"});
};

// done is a callback that should be provided, function(err: Any, hasAccess: boolean, info?: Any)
// required is a bit field of required access rights.
exports.hasAccess = (required, user, done) =>{
    if (!user)
        return done(null, false, {message: "user not logged in"});
    User.findById(user.id)
        .then(user => {
            if (!user || !user.auth)
               return done(null, false, {message: "user not found"});
            if (user.auth & required !== required)
                return done(null, false, {message: "unsufficient permission"})
            return done(null, true)
        })
        .catch((err) => done(err, false))
}

exports.ACCESS = Object.freeze({
    R: 1,
    W: 2,
    X: 4
});