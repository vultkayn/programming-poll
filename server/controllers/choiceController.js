const Choice = require("../models/choiceModel");

exports.list = (req, res) => {
    res.send("NOT IMPLEMENTED: choice list.");
}

exports.detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: choice detail of ${req.params.id}`);
}

exports.create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: choice create POST");
}

exports.create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: choice create GET");
}


exports.delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: choice delete POST");
}

exports.delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: choice delete GET");
}


exports.update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: choice update GET");
}

exports.update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: choice update POST");
}
