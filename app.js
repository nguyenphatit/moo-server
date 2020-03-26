// using enviroment
const dotenv = require('dotenv');
dotenv.config({ path: './bin/enviroment.env' });

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const passport = require('passport');

const seedDataHelper = require('./helpers/seed-data-helper');
const MemoryCacher = require('./lib/memory-cacher');

// connection with database
const dbConfig = require('./configs/db.config');
const db = require('./models');

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
const indexRouter = require('./routes/index');
const authsRouter = require('./routes/auths');
const todosRouter = require('./routes/todos');
const tasksRouter = require('./routes/tasks');

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
app.use('/todos', todosRouter);
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
