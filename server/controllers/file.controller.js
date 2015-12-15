var fs = require('fs');

var File = require('../models/file.model');
var filePath = './uploads/';

exports.addFile = addFile;
exports.downloadFile = downloadFile;
exports.findFiles = findFiles;
exports.getFiles = getFiles;
exports.getFileById = getFileById;
exports.getFilesByPage = getFilesByPage;
exports.getNumberOfFiles = getNumberOfFiles;

//add file
function addFile(res, fileInfo, file) {
    var file = new File({
        title: fileInfo.title,
        author: fileInfo.author,
        tags: fileInfo.tags,
        category: fileInfo.category,
        subcategory: fileInfo.subcategory,
        publicationYear: fileInfo.publicationYear,
        publicationPlace: fileInfo.publicationPlace,
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

//find files
function findFiles(res, searchQuery) {
    var query = constructSearchQuery(searchQuery);
    File.find(query, function (err, results) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(results);
        }
    })
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

function getFilesByPage(res, pageNumber, pageSize, category, subcategory) {
    var query = constructCategoryQuery(category, subcategory);
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
function getNumberOfFiles(res, category, subcategory) {
    var query = constructCategoryQuery(category, subcategory);
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

function base64_encode(destination, filepath) {
    //need this prefix to donload from frontend
    var prefix = "data:" + ";base64,";
    // read binary data
    var bitmap = fs.readFileSync(destination + '/' + filepath);
    var base64 = new Buffer(bitmap, 'binary').toString('base64');
    return prefix + base64;
}

function constructCategoryQuery(category, subcategory) {
    if (category === 'All') {
        query = {};
    }
    else {
        if (subcategory === 'All') {
            query = {category: category};
        }
        else {
            query = {category: category, subcategory: subcategory};
        }
    }
    return query;
}

function constructSearchQuery(searchQuery) {
    var query = {};
    Object.keys(searchQuery).forEach(function (key) {
        if (key === 'category') {
            if (searchQuery[key] === 'All') {
                return;
            }
        }
        if (key === 'subcategory') {
            if (searchQuery['category'] === 'All') {
                return;
            }
            else {
                query['category'] = searchQuery['category'];
                if (!(searchQuery[key] === 'All')) {
                    query[key] = searchQuery[key];
                }
                return;
            }
        }
        if (!(!searchQuery[key] || searchQuery[key] === "0" || ((typeof searchQuery[key] === 'string' || searchQuery[key] instanceof String) && !searchQuery[key].trim()))) {
            query[key] = {$regex: new RegExp(searchQuery[key], 'i')};
        }
    });
    return query;
}

function getFileExtension(filename) {
    var extension = filename.split('.');
    return extension[extension.length - 1];
}