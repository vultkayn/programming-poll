const mongoose = require("mongoose");

require("mongoose-type-email");

const Schema = mongoose.Schema;

const IdentitySchema = new Schema({
    lastName: {type:String, required: true, minLength: 2, maxLength: 20, uppercase: true},
    firstName: {type:String, required: true, minLength: 2, maxLength: 20},
    emails: [mongoose.SchemaTypes.Email]
});

exports.Schema = IdentitySchema;
exports.Model = mongoose.model("Identity", IdentitySchema);