require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require('./passport/setup');
var apiRouter = require('./routes/api');

var app = express();

// connect database
const mongoose = require('./db/connection');
  

// Request formatting and parser middlewares 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Session and authentification middlewares
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {/* secure: true, */ httpOnly: true},
  store: MongoStore.create({
    client: mongoose.connection.getClient(),
    dbName: "mongo_store",
    collectionName: "sessions"
  })
  .on('create', () => console.log("A session has been created"))
  .on('update', () => console.log("A session has been updated"))
  .on('destroy', () => console.log("A session has been destroyed"))
}));
app.use(passport.initialize());
app.use(passport.session());

// Set up routes static, to api endpoint, to the client
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use('/api', apiRouter);
// send to React client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


// Error handlers middlewares
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  if (!err.status)
    console.log(err);
  res.status(err.status || 500);
  res.json(req.app.get('env') === 'development' ? err : {});
});


module.exports = app;
