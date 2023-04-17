const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    date: {type: Date, default: Date.now, required: true},
    choices: [{type: Schema.Types.ObjectId, ref: 'Choice', required: true}],
    answeredBy: {type: Schema.Types.ObjectId, ref: 'Student', required: true}
});

module.exports = mongoose.model("Answer", AnswerSchema);