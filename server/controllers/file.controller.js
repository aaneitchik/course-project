var File = require('../models/file.model');

exports.getFiles = getFiles;
exports.getFileById = getFileById;
exports.getFilesByPage = getFilesByPage;
exports.getNumberOfFiles = getNumberOfFiles;

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
};

function getFileById(res, id) {
    console.log('getting fil;e by id');
    File.findById(id).exec(function(err, file) {
        if(err) {
            res.status(500).send(err);
        }
        else {
            res.json(file);
        }
    });
}

function getFilesByPage(res, pageNumber, pageSize) {
    File.paginate({}, {page: pageNumber, limit: pageSize}, function(err, results) {
        if(err) {
            res.status(500).send(err);
        }
        else {
            res.json(results);
        }
    });
};

//get total number of files
function getNumberOfFiles(res) {
    File.count(function (err, fileNumber) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(fileNumber);
        }
    });
};