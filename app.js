// using enviroment
var dotenv = require('dotenv');
dotenv.config({ path: './bin/enviroment.env' });

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var passport = require('passport');

var seedDataHelper = require('./helpers/seed-data-helper');
var MemoryCacher = require('./lib/memory-cacher');

// connection with database
var dbConfig = require('./configs/db.config');
var db = require('./models');

// sync database
db.sequelize.sync({ force: dbConfig.migrate === 'drop' ? true : false }).then(() => {
  console.log('Drop and re-sync db.');
  // run seed data
  seedDataHelper.seed(() => overrideGlobalSetting());

  // write cache
  overrideGlobalSetting = () => {
    db.GlobalSetting.findAll().then(globalSetting => {
      MemoryCacher.put('global-setting', globalSetting[0].dataValues);
    });
  }
});


// routes
var indexRouter = require('./routes/index');
var tasksRouter = require('./routes/tasks');
var authsRouter = require('./routes/auths');

const app = express();

app.use(passport.initialize());
require('./configs/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auths', authsRouter);
app.use('/tasks', tasksRouter);

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
