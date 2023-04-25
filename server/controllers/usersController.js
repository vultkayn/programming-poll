const {query} = require('express-validator');



exports.list = (req, res) => {
    res.send("NOT IMPLEMENTED: student list.");
}

exports.detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: student detail of ${req.params.id}`);
}

exports.create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: student create POST");
}

exports.create_get = [
    query("auth").notEmpty().isJWT()

];


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
