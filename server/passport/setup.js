const User = require('../models/userModel');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');




// FIXME fix creation of User model (especially look into IdentityModel)
function signup(body, id, password) {
    const newUser = new User({
        univID: id,
        password: password,
        firstName: body.firstname,
        lastName: body.lastname,
        promo: body.promo,
        email: body.email
    });
    // hash password
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds)
        .then(salt => {
            return bcrypt.hash(password, salt)
        })
        .then(hash => {
            newUser.password = hash;
            newUser
                .save()
                .then(user => {return {user}})
                .catch(err => {return {user: false, err}});
        })
        .catch(err => {user: false, err});
}

// define LocalStrategy
// strategy responsible both for connection and sign up
passport.use('login',
    new LocalStrategy({usernameField: "univID"}, (id, password, done) => {
        User.findOne({univID: id})
            .then( user => {
                // no such user, create it.
                if (!user) {
                    return done(null, false, {message: err});
                } else {
                    // user was found
                    bcrypt.compare(password, user.password)
                    .then(res => {
                        if (res) // success
                            return done(null, user);
                        return done(null, false, {message: "Wrong Password"});
                    })
                    .catch(err => done(null, false, {message: err}));
                }
            })
            .catch(err => {
                return done(null, false, {message: err});
            })
    })
);

passport.use('signup',
    new LocalStrategy({usernameField: "univID", passReqToCallback: true}, (req, id, password, done) => {
        User.findOne({univID: id})
            .then( user => {
                // no such user, create it.
                if (!user) {
                    signup(req.body, user, password)
                        .then ( ({user, err}) => {
                            if (err !== undefined)
                                return done(null, false, {message: err});
                            return done(null, user);
                        });
                } else {
                    // user was found
                    return done(null, user, {message: err});
                }
            })
            .catch(err => {
                return done(null, false, {message: err});
            })
    })
);

module.exports = passport;