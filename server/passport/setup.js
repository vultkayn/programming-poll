const User = require('../models/userModel');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');


passport.serializeUser(function(user, done) {
    return done (null, {id: user.id, univID: user.univID});
});

passport.deserializeUser(function (user, done) {
    return done (null, user);
});


// FIXME fix creation of User model (especially look into IdentityModel)
async function signup(req, univID, password) {
    const newUser = new User({
        identity: {
            univID: univID,
            password: password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        },
        promo: req.body.promo,
    });
    // hash password
    const saltRounds = 10;
    return bcrypt.genSalt(saltRounds)
        .then(salt => {
            return bcrypt.hash(password, salt)
        })
        .then(hash => {
            newUser.identity.password = hash;
            return newUser
                .save()
                .then(user => {return {user}})
                .catch(err => {return {user: false, err}});
        })
        .catch(err => {return {user: false, err}});
}

// define LocalStrategy
// strategy responsible both for connection and sign up
passport.use('login', new LocalStrategy({
        usernameField: "univID",
        passwordField: "password"
    },
    (univID, password, done) => {
        User.findOne({'identity.univID': univID})
            .then( user => {
                // no such user, create it.
                if (!user) {
                    return done(null, false, {status: 401, message: "User not found"});
                } else {
                    // user was found
                    return bcrypt.compare(password, user.identity.password)
                    .then(res => {
                        if (res) // success
                            return done(null, user);
                        return done(null, false, {status: 401, message: "Wrong password"});
                    })
                }
            })
            .catch(err => {
                return done(null, false, err);
            })
    })
);

passport.use('signup',
    new LocalStrategy({
        usernameField: "univID",
        passwordField: "password",
        passReqToCallback: true,
    },
    (req, univID, password, done) => {
        User.findOne({$or: [{"identity.univID": univID}, {"identity.email": req.body.email}]})
            .then( user => {
                // no such user, create it.
                if (!user) {
                    signup(req, univID, password)
                        .then ( ({user, err}) => {
                            if (err)
                                return done(null, false, err);
                            return done(null, user);
                        });
                } else {
                    // user was found
                    return done(null, false, {status: 400, message: "User already exists"});
                }
            })
            .catch(err => {
                return done(null, false, err);
            })
    })
);

module.exports = passport;