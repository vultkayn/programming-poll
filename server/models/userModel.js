const mongoose = require("mongoose");

const Identity = require("./identityModel");


const Schema = mongoose.Schema;

const UserSchema = new Schema({
    promo: {
        type: Number,
        min: 2023
    },
    "class": {
        type: String,
        trim: true,
        uppercase: true,
        minLength: 2,
        maxLength: 10
    },
    group: {
        type: String,
        trim: true,
        uppercase: true,
        minLength: 2,
        maxLength: 10
    },
    identity: {
        type: Identity.Schema,
        default: {}
    }
});

module.exports = mongoose.model('User', UserSchema);