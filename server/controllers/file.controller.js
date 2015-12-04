var fs = require('fs');

var File = require('../models/file.model');
var filePath = './uploads/';

exports.addFile = addFile;
exports.downloadFile = downloadFile;
exports.getFiles = getFiles;
exports.getFileById = getFileById;
exports.getFilesByPage = getFilesByPage;
exports.getNumberOfFiles = getNumberOfFiles;

//add file
function addFile(res, fileInfo, file) {
    var file = new File({
        title: fileInfo.title,
        author: fileInfo.author,
        type: fileInfo.type,
        shortDescription: fileInfo.shortDescription,
        description: fileInfo.description,
        filepath: file.destination + '/' + file.originalname,
        filename: file.originalname,
        fileExtension: getFileExtension(file.originalname)
    });
    file.save(function (err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send('File created successfully!');
        }
    });
}

//get all files
function getFiles(res) {
    File.find(function (err, files) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(files);
        }
    });
}

function getFileById(res, id) {
    File.findById(id).exec(function (err, file) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(file);
        }
    });
}

function getFilesByPage(res, pageNumber, pageSize, fileType) {
    var query = (fileType === 'undefined' || fileType === 'All') ? {} : {type: fileType};
    File.paginate(query, {page: pageNumber, limit: pageSize, sortBy: {createdOn: -1}}, function (err, results) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(results);
        }
    });
}

//get total number of files
function getNumberOfFiles(res, category) {
    var query = (category === 'undefined' || category === 'All') ? {} : {type: category};
    File.count(query, function (err, fileNumber) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(fileNumber);
        }
    });
}


function downloadFile(res, id) {
    File.findById(id).exec(function (err, file) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            var fileToDownload = fs.readFileSync(file.filepath, 'binary');
            var buffer = new Buffer(fileToDownload, 'binary');
            var stat = fs.statSync(filePath + file.filename);
            res.setHeader('Content-Length', stat.size);
            res.setHeader('Content-Type', 'application/octet-stream');
            res.setHeader('Content-Disposition', 'attachment; filename=' + file.filename);
            res.end(buffer);
        }
    });
}

////////////////////////////////////
function base64_encode(destination, filepath) {
    //need this prefix to donload from frontend
    var prefix = "data:" + ";base64,";
    // read binary data
    var bitmap = fs.readFileSync(destination + '/' + filepath);
    var base64 = new Buffer(bitmap, 'binary').toString('base64');
    return prefix + base64;
}

function getFileExtension(filename) {
    var extension = filename.split('.');
    return extension[extension.length - 1];
}