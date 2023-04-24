const {query, body, validateResult} = require('express-validator');

const passport = require("passport");


const commonValidation = [
    body ('univID')
        .notEmpty()
        .escape(),

    (req, res, next) => {
        const errors =  validateResult(req);

        if (! errors.isEmpty())
        {
            res.status(400).send({errors: errors.mapped()});
            next(errors);
        }

        next();
    }
];

exports.connexion = [
    ...commonValidation,

    (req, res, next) => {
        passport.authenticate('login', function(err, user, info) {
            if (err)
                return res.status(400).json({errors: err});
            if (!user)
                return res.status(400).json({errors: "User not found"});
            req.logIn(user, function (err) {
                if (err)
                    return res.status(400).json({errors: err});
                return res.status(200).json({univID: user.univID});
            });
        });
        next ();
    }
];

exports.signup = [
    body('password')
        .isStrongPassword({minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1})
        .withMessage('Password should contain at least 1 uppercase, 1 number, 1 symbol')
        .escape()
        .withMessage('Password contains illegal characters.'),

    body('firstName')
        .notEmpty()
        .escape(),
    
    body('lastName')
        .notEmpty()
        .escape(),
    
    body('email')
        .isEmail()
        .withMessage('email should be an Email !')
        .escape()
        .withMessage('email contains illegal character'),

    body('promo')
        .isInt({min: 1990, max: 2100}),

    ...commonValidation,

    passport.authenticate('signup', function(err, user, info) {
        if (err)
            return res.status(400).json({errors: err});
        if (!user)
            return res.status(400).json({errors: "User not found"});
        req.logIn(user, function (err) {
            if (err)
                return res.status(400).json({errors: err});
            return res.status(200).json({univID: user.univID });
        });
        next ();
    })
];

exports.list = (req, res) => {
    res.send("NOT IMPLEMENTED: student list.");
}

exports.detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: student detail of ${req.params.id}`);
}

exports.create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: student create POST");
}

exports.create_get = [
    query("auth").notEmpty().isJWT()

];


exports.delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: student delete POST");
}

exports.delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: student delete GET");
}


exports.update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: student update GET");
}

exports.update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: student update POST");
}
