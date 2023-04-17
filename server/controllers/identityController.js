const Identity = require("../models/identityModel");

exports.list = (req, res) => {
    res.send("NOT IMPLEMENTED: Identity list.");
}

exports.detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: identity detail of ${req.params.id}`);
}

exports.create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: identity create POST");
}

exports.create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: identity create GET");
}


exports.delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: identity delete POST");
}

exports.delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: identity delete GET");
}


exports.update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: identity update GET");
}

exports.update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: identity update POST");
}
