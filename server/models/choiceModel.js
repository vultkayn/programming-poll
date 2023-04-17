const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChoiceSchema = new Schema({
    content: {type: String, required: true},
    language: {type: String, maxLength: 15, lowercase: true},
    label: {type: String, maxLength:15}
});

module.exports = mongoose.model("Choice", ChoiceSchema);
