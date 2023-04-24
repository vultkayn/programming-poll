const mongoose = require("mongoose");

require("mongoose-type-email");

const Schema = mongoose.Schema;

const IdentitySchema = new Schema({
    lastName: {
        type: String,
        required: true,
        uppercase: true
    },
    firstName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true,
        unique: true
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    univID: {
        type: String,
        maxLength: 10,
        unique: true,
        required: true
    }
});

exports.Schema = IdentitySchema;
exports.Model = mongoose.model("Identity", IdentitySchema);