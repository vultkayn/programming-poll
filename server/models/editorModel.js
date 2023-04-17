const mongoose = require("mongoose");

require("mongoose-type-email");

const Schema = mongoose.Schema;

const EditorSchema = new Schema({
    email: {type: mongoose.SchemaTypes.Email, required: true},
    lastName: {type: String, required: true},
    firstName: {type: String, required: true}
});

EditorSchema.virtual("url").get(function() {
    return `/editor/${this._id}`;
});

module.exports = mongoose.model("Editor", EditorSchema);