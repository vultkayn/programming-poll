const Editor = require("../models/editorModel");

exports.index = (req, res) => {
    res.send("NOT IMPLEMENTED: editor index page");
}

exports.connect = (req, res) => {
    res.send("NOT IMPLEMENTED: editor connect page")
}

exports.list = (req, res) => {
    res.send("NOT IMPLEMENTED: editor list.");
}

exports.detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: editor detail of ${req.params.id}`);
}

exports.create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: editor create POST");
}

exports.create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: editor create GET");
}


exports.delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: editor delete POST");
}

exports.delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: editor delete GET");
}


exports.update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: editor update GET");
}

exports.update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: editor update POST");
}
