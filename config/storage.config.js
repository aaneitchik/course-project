var multer = require('multer');

var allowedExtensions = ['djvu', 'doc', 'docx', 'jpg', 'jpeg', 'mp3', 'mp4', 'pdf', 'rar', 'txt', 'zip'];

module.exports = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        var extension = (file.originalname).split('.');

        //If you want file to be uploaded with extension only then
        //remove file.originalname.length == 0 and replace it with extension.length < 2

        if ((extension.length == 2 &&
            extension[1].length == 0) ||
            extension.length > 2 &&
            file.originalname.length == 0) {
            cb(new Error("ERROR!"));
        }
        else {
            //Add extensions you wanna permit and
            //if you don't want file to be uploaded without extension then
            //simply remove : extension[extension.length-1] == file.originalname

            if (allowedExtensions.indexOf(extension[extension.length - 1]) > -1) {
                //Change extensions according to your project needs!
                //Success!
                cb(null, file.originalname);
            }
            else {
                cb(new Error("ERROR!"));
            }
        }
    }
});