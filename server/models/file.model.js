var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var fileModel = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    data: {
        type: String,
        default: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

fileModel.plugin(mongoosePaginate);

module.exports = mongoose.model('File', fileModel);