var express = require('express');
var passport = require('passport');
var multer = require('multer');
var fs = require('fs');

var fileCtrl = require('./controllers/file.controller');
var categoryCtrl = require('./controllers/category.controller');

var fileRouter = express.Router();
require('../config/passport')(passport);

var storageConfig = require('../config/storage.config.js');

var upload = multer({storage: storageConfig});

//get all files
fileRouter.route('/files')
    .get(isLoggedIn, function (req, res) {
        return fileCtrl.getFiles(res);
    });

//get number of files
fileRouter.route('/files_number/:category/:subcategory')
    .get(isLoggedIn, function (req, res) {
        var category = req.params.category;
        var subcategory = req.params.subcategory;
        return fileCtrl.getNumberOfFiles(res, category, subcategory);
    });


//get files by page
fileRouter.route('/files/:page/:page_size/:file_category/:file_subcategory')
    .get(isLoggedIn, function (req, res) {
        var pageNumber = req.params.page;
        var pageSize = req.params.page_size;
        var category = req.params.file_category;
        var subcategory = req.params.file_subcategory;
        return fileCtrl.getFilesByPage(res, pageNumber, pageSize, category, subcategory);
    });

//get file by id
fileRouter.route('/file/:id')
    .get(isLoggedIn, function (req, res) {
        var id = req.params.id;
        return fileCtrl.getFileById(res, id);
    })
    .put(isLoggedIn, function(req, res) {
        var id = req.params.id;
        var fileInfo = req.body;
        return fileCtrl.editFileById(res, id, fileInfo);
    })
    .delete(isLoggedIn, function(req, res) {
        var id = req.params.id;
        return fileCtrl.deleteFileById(res, id);
    });

//find files by query
fileRouter.route('/find_files')
    .post(isLoggedIn, function (req, res) {
        var query = req.body;
        return fileCtrl.findFiles(res, query);
    });

//download file
fileRouter.route('/download_file/:id')
    .get(isLoggedIn, function (req, res) {
        var id = req.params.id;
        return fileCtrl.downloadFile(res, id);
    });

//load file to the lib
fileRouter
    .post('/file_upload', upload.single('file'), function (req, res) {
        var fileInfo = JSON.parse(req.body.fileInfo);
        var file = req.file;
        return fileCtrl.addFile(res, fileInfo, file);
    });

//get all categories
fileRouter.route('/type_categories')
    .get(isLoggedIn, function (req, res) {
        return categoryCtrl.getAllCategories(res);
    });

//user sign in
fileRouter.route('/signup')
    .post(passport.authenticate('local-signup'), function (req, res) {
        res.status(200).send({sessionId: req.session.id, user: req.user.local.email});
    });

//user log in
fileRouter.route('/login')
    .post(passport.authenticate('local-login'), function (req, res) {
        res.status(200).send({sessionId: req.session.id, user: req.user.local.email});
    });

fileRouter.route('/login_with_cookies')
    .post(function(req, res, next) {
        if(req.isAuthenticated()) {
            res.status(200).send(req.user.local.email);
        }
        return next();
    });

//user logs out
fileRouter.route('/logout')
    .post(isLoggedIn, function(req, res, next) {
        if(req.isAuthenticated()) {
            req.logout();
            res.status(200).send();
        }
        return next();
    });

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send();
}

module.exports = fileRouter;