var express = require('express');

var File = require('./models/fileModel.js');

var fileRouter = express.Router();


//get all files
fileRouter.route('/files')
    .get(function (req, res) {
        File.find(function (err, files) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(files);
            }
        });
    });


module.exports = fileRouter;