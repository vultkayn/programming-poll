const Answer = require("../models/answerModel");

exports.list = (req, res) => {
    res.send("NOT IMPLEMENTED: answer list.");
}

exports.detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: answer detail of ${req.params.id}`);
}

exports.create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: answer create POST");
}

exports.create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: answer create GET");
}


exports.delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: answer delete POST");
}

exports.delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: answer delete GET");
}


exports.update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: answer update GET");
}

exports.update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: answer update POST");
}
