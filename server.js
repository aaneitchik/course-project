var express = require('express'),
    mongoose = require('mongoose');

var app = express();
var port = process.env.PORT || 8080;
var fileRouter = require('./server/routes.js');

var database = require('./config/database.js');
mongoose.connect(database.url);

app.use('/api', fileRouter);

app.listen(port, function() {
    console.log('Running on PORT ' + port);
});