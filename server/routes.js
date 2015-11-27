var express = require('express');

var File = require('./models/fileModel.js');
var Category = require('./models/categoryModel.js');

var fileRouter = express.Router();

var getFilesByPage = getFilesByPage;


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

//get number of files
fileRouter.route('/files_number')
    .get(function(req, res) {
       File.count(function(err, fileNumber) {
           if(err) {
               res.status(500).send(err);
           }
           else {
               res.json(fileNumber);
           }
       });
    });

//get files by page
fileRouter.route('/files/:page/:page_size')
    .get(function (req, res) {
        var pageNumber = req.params.page;
        var pageSize = req.params.page_size;
        res.json(getFilesByPage(pageNumber, pageSize));
    });

//get all categories
fileRouter.route('/type_categories')
    .get(function (req, res) {
        Category.find(function (err, categories) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(categories);
            }
        });
    });


///////////////////////////////////////////////////

function getFilesByPage(pageNumber, pageSize) {
    //console.log(pageNumber + ' ' + pageSize);
    //var pageFiles = File.find().limit(pageSize);
    //console.log(pageFiles);
    //var lastIdOnPage = pageFiles[pageFiles.length - 1]._id;
    //console.log('Last id on page: ', lastIdOnPage);
    //
    //for (var i = 1; i < pageNumber; i++) {
    //    pageFiles = File.find('_id' > lastIdOnPage).limit(pageSize);
    //    lastIdOnPage = pageFiles[pageFiles.length - 1]._id;
    //    console.log('Last id on page: ', lastIdOnPage);
    //}
    //return pageFiles;
}
module.exports = fileRouter;