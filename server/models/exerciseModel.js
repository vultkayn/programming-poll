const mongoose = require("mongoose");
const { Schema } = mongoose;

const ExerciseSchema = new Schema({
    title: {type: String, maxLength: 100},
    statement:{type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    lastModified: {type: Date, default: Date.now, required: true},
    answerType: {
        type: String,
        required: true,
        enum: ["Checkbox", "Radio"],
        default: "Checkbox"
    },
    lastModifiedBy: {type: Schema.Types.ObjectId, ref: "Editor", required: true},
    category: [{
        type: Schema.Types.ObjectId, 
        ref: "Category" 
    }]
});

module.exports = mongoose.model("Exercise", ExerciseSchema);