var express = require('express');
var mongoose = require('mongoose');

var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

var app = express();
var port = process.env.PORT || 8080;

var database = require('./config/database');
mongoose.connect(database.url);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'mybsulibappsecret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var fileRouter = require('./server/routes');

app.use('/api', fileRouter);

app.listen(port, function() {
    console.log('Running on PORT ' + port);
});