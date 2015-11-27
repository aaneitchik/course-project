var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var category = new Schema({
    type: {
        type: String
    }
});

module.exports = mongoose.model('Category', category);