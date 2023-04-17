const Exercise = require("../models/exerciseModel");

exports.list = (req, res) => {
    res.send("NOT IMPLEMENTED: exercise list.");
}

exports.detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: exercise detail of ${req.params.id}`);
}

exports.create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: exercise create POST");
}

exports.create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: exercise create GET");
}


exports.delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: exercise delete POST");
}

exports.delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: exercise delete GET");
}


exports.update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: exercise update GET");
}

exports.update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: exercise update POST");
}
