var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var userModel = new Schema({
    local: {
        email: String,
        password: String
    }
});

userModel.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userModel.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userModel);