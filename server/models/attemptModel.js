const mongoose = require("mongoose");
const { Schema } = mongoose;

const AttemptSchema = new Schema(
  {
    submissionDate: { type: Date, default: Date.now, required: true },
    answers: [
      {
        question: {
          type: Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        values: [
          {
            name: { type: String, required: true, maxLength: 15 },
            value: String,
          },
        ],
      },
    ],
    exercise: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Exercise",
      },
    ],
  },
  { toJSON: { virtuals: true } }
);

AttemptSchema.virtual("solved").get(function () {
  return false; // FIXME virtual solved for attempts ?
});

exports.model = mongoose.model("Attempt", AttemptSchema);
exports.titleRegex = mongoose.model("Attempt", AttemptSchema);
