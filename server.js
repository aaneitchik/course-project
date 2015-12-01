var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 8080;

var fileRouter = require('./server/routes');

var database = require('./config/database');
mongoose.connect(database.url);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', fileRouter);

app.listen(port, function() {
    console.log('Running on PORT ' + port);
});