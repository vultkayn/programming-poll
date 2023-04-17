const Category = require("../models/categoryModel");

exports.list = (req, res) => {
    res.send("NOT IMPLEMENTED: category list.");
}

exports.detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: category detail of ${req.params.id}`);
}

exports.create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: category create POST");
}

exports.create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: category create GET");
}


exports.delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: category delete POST");
}

exports.delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: category delete GET");
}


exports.update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: category update GET");
}

exports.update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: category update POST");
}
