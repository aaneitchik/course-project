var Category = require('../models/category.model');

exports.getAllCategories = function(res) {
    Category.find(function (err, categories) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(categories);
        }
    });
};