const Student = require("../models/studentModel");


exports.index = (req, res) => {
    res.render("index", {title: "Student Home page"});
}

exports.list = (req, res) => {
    res.send("NOT IMPLEMENTED: student list.");
}

exports.detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: student detail of ${req.params.id}`);
}

exports.create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: student create POST");
}

exports.create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: student create GET");
}


exports.delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: student delete POST");
}

exports.delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: student delete GET");
}


exports.update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: student update GET");
}

exports.update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: student update POST");
}
