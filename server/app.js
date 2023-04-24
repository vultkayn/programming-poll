const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require('passport/setup');
var apiRouter = require('./routes/api');

var app = express();

require('dotenv').config();


// connect database
const mongoose = require("mongoose");
const mongoDBURL = "mongodb+srv://vultkayn:KwtfvvGVp0uuvXOy@cluster0.iklopuz.mongodb.net/prog_feedback?retryWrites=true&w=majority";
mongoose
  .connect(mongoDBURL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(console.log(`Connected to MongoDB at ${mongoDBURL}`))
  .catch(err => console.log(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {/* secure: true, */ httpOnly: true},
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use('/api', apiRouter);
// send to React client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json(req.app.get('env') === 'development' ? err : {});
});

module.exports = app;
