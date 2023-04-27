const mongoose = require("mongoose");

require("mongoose-type-email");
const Schema = mongoose.Schema;

const IdentitySchema = new Schema({
    univID: {
        type: String,
        minLength: 3,
        maxLength: 10,
        unique: true,
        required: true
    },
    lastName: {
        type: String,
        minLength: 1,
        required: true
    },
    firstName: {
        type: String,
        minLength: 1,
        required: true,
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
    password: {
        type: String,
        required: true
    }
});


const UserSchema = new Schema({
    promo: { // save it out of identity for metrics independent of RFPD
        type: Number,
        min: 1990,
        max: 2100,
        required: true
    },
    auth: {
        type: Number,
        min: 0,
        max: 7,
        default: 0,
    },
    identity: {
        type: IdentitySchema,
        default: {}
    }
});

UserSchema.virtual("fullname").get(function () {
    // To avoid errors in cases where an author does not have either a family name or first name
    // We want to make sure we handle the exception by returning an empty string for that case
    let fullname = "";
    if (this.identity.firstName && this.identity.lastName) {
      fullname = `${this.identity.firstName} ${this.identity.lastName}`;
    }
    return fullname;
  });

UserSchema.virtual("univID").get(function () {
    // To avoid errors in cases where an author does not have either a family name or first name
    // We want to make sure we handle the exception by returning an empty string for that case
    return this.identity && this.identity.univID;
  });

module.exports = mongoose.model('User', UserSchema);