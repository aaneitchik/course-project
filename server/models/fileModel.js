var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var fileModel = new Schema({
    title: {
        type: String
    },
    author: {
        type: String
    }
});

module.exports = mongoose.model('File', fileModel);