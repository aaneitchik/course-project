var fs = require('fs');

var File = require('../models/file.model');

exports.addFile = addFile;
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
        file: base64_encode(file.destination, file.originalname),
        filename: file.originalname
    });
    file.save(function(err) {
        if(err) {
            console.log(err);
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

////////////////////////////////////
function base64_encode(destination, filepath) {
    //need this prefix to donload from frontend
    var prefix = "data:" + ";base64,";
    // read binary data
    var bitmap = fs.readFileSync(destination + '/' + filepath);
    var base64 = new Buffer(bitmap, 'binary').toString('base64')
    return prefix + base64;
}