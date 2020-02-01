var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var fixtureRouter = require('./routes/fixtures');
var teamRouter = require('./routes/teams');
var userRouter = require('./routes/users');
const logRocket = require('logrocket');
logRocket.init('pvy6hr/mock-pl-api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

logRocket.identify('THE_USER_ID_IN_YOUR_APP', {
  name: 'James Morrison',
  email: 'jamesmorrison@example.com',

  // Add your own custom user variables here, ie:
  subscriptionType: 'pro'
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/fixtures', fixtureRouter);
app.use('/teams', teamRouter);
app.use('/users', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
