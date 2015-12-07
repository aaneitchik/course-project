var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var category = new Schema({
    type: {
        type: String,
        required: true
    },
    subcategories: {
        type: Array,
        default: ["Other"]
    }
});

module.exports = mongoose.model('Category', category);