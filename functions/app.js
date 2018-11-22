const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');
const gamesRouter = require('./routes/games');
const testRouter = require('./routes/test');
const usersApiRouter = require('./api/users');
const gamesApiRouter = require('./api/games');

const app = express();
//const bodyParser = require('body-parser');
//app.use(bodyParser.json()); // parse application/json
//app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/games', gamesRouter);
app.use('/test', testRouter);
app.use('/api/users', usersApiRouter);
app.use('/api/games', gamesApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
