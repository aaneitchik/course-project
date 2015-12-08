var express = require('express');
var multer = require('multer');
var fs = require('fs');

var fileCtrl = require('./controllers/file.controller');
var categoryCtrl = require('./controllers/category.controller');

var fileRouter = express.Router();

var storageConfig = require('../config/storage.config.js');

var upload = multer({storage: storageConfig});

//get all files
fileRouter.route('/files')
	.get(function (req, res) {
		return fileCtrl.getFiles(res);
	});

//get number of files
fileRouter.route('/files_number/:category/:subcategory')
	.get(function (req, res) {
		var category = req.params.category;
		var subcategory = req.params.subcategory;
		return fileCtrl.getNumberOfFiles(res, category, subcategory);
	});


//get files by page
fileRouter.route('/files/:page/:page_size/:file_category/:file_subcategory')
	.get(function (req, res) {
		var pageNumber = req.params.page;
		var pageSize = req.params.page_size;
		var category = req.params.file_category;
		var subcategory = req.params.file_subcategory;
		return fileCtrl.getFilesByPage(res, pageNumber, pageSize, category, subcategory);
	});

//get file by id
fileRouter.route('/file/:id')
	.get(function (req, res) {
		var id = req.params.id;
		return fileCtrl.getFileById(res, id);
	});

//find files by query
fileRouter.route('/find_files')
	.post(function (req, res) {
		var query = req.body;
        return fileCtrl.findFiles(res, query);
	});

//download file
fileRouter.route('/download_file/:id')
	.get(function (req, res) {
		var id = req.params.id;
		return fileCtrl.downloadFile(res, id);
	});

//get all categories
fileRouter.route('/type_categories')
	.get(function (req, res) {
		return categoryCtrl.getAllCategories(res);
	});

//load file to the lib
fileRouter
	.post('/file_upload', upload.single('file'), function (req, res) {
		var fileInfo = JSON.parse(req.body.fileInfo);
		var file = req.file;
		return fileCtrl.addFile(res, fileInfo, file);
	});

module.exports = fileRouter;