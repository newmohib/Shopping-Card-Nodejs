var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session')
var passport = require('passport')
var flash = require('connect-flash')
const MongoStore = require('connect-mongo')(session);
const initialize=require('./config/passport');


var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

var app = express();

mongoose.connect('mongodb://localhost/shopping')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

app.engine('.hbs',expressHbs({defaultLayout: 'layout',extname: 'hbs'}));
app.set('view engine', '.hbs');

initialize();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  ttl:  60 * 60
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// this is use for global authentication
app.use(function(req, res, next) {
  res.locals.login=req.isAuthenticated();
  res.session=req.session;      //this is for memory session whene we store session data in database
  next();
});

app.use('/', indexRouter);
app.use('/user', userRouter);


app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
