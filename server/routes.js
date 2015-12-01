var express = require('express');

var fileCtrl = require('./controllers/file.controller');
var categoryCtrl = require('./controllers/category.controller');

var fileRouter = express.Router();

//get all files
fileRouter.route('/files')
    .get(function (req, res) {
        return fileCtrl.getFiles(res);
    });

//get number of files
fileRouter.route('/files_number')
    .get(function (req, res) {
        return fileCtrl.getNumberOfFiles(res);
    });

//get files by page
fileRouter.route('/files/:page/:page_size')
    .get(function (req, res) {
        var pageNumber = req.params.page;
        var pageSize = req.params.page_size;
        return fileCtrl.getFilesByPage(res, pageNumber, pageSize);
    });

//get file by id
fileRouter.route('/files/file/:id')
    .get(function (req, res){
        var id = req.params.id;
        return fileCtrl.getFileById(res, id);
    });

//get all categories
fileRouter.route('/type_categories')
    .get(function (req, res) {
        return categoryCtrl.getAllCategories(res);
    });

module.exports = fileRouter;