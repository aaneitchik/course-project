var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var fileModel = new Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    type: {
        type: String
    },
    description: {
        type: String
    },
    dateAdded: {
        type: Date
    }
});

module.exports = mongoose.model('File', fileModel);