var express = require('express');
var multer  = require('multer');

var fileCtrl = require('./controllers/file.controller');
var categoryCtrl = require('./controllers/category.controller');

var fileRouter = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        extension = (file.originalname).split('.');

        //If you want file to be uploaded with extension only then
        //remove file.originalname.length == 0 and replace it with extension.length < 2

        if((extension.length == 2 &&
            extension[1].length == 0) ||
            extension.length > 2 &&
            file.originalname.length == 0) {
            cb(new Error("ERROR!"));
        }
        else {
            //Add extensions you wanna permit and
            //if you don't want file to be uploaded without extension then
            //simply remove : extension[extension.length-1] == file.originalname

            if(extension[extension.length-1] == "properties" ||
                extension[extension.length-1] == "txt" ||
                extension[extension.length-1] == file.originalname) {
                //Change extensions according to your project needs!
                //Success!
                console.log(file);
                cb(null, file.originalname);
            }
            else {
                cb(new Error("ERROR!"));
            }
        }
    }
});

var upload = multer({ storage: storage });

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
fileRouter.route('/file/:id')
    .get(function (req, res){
        var id = req.params.id;
        console.log(id);
        return fileCtrl.getFileById(res, id);
    });

//get all categories
fileRouter.route('/type_categories')
    .get(function (req, res) {
        return categoryCtrl.getAllCategories(res);
    });

//load file to the lib
fileRouter
    .post('/file_upload', upload.single('file'), function(req, res) {
        console.log(req.body);
        console.log(req.file);
    });

module.exports = fileRouter;