const mongoose = require("mongoose");
const { Schema } = mongoose;

const titleRegex = /[\w ?^.{}[\]_,+-]+/;

const QuestionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: [1, "Cannot have an empty title"],
      maxLength: 60,
      validate: {
        validator: (v) => {
          return titleRegex.test(v);
        },
        message: "Invalid format of the title",
      },
    },
    statement: { type: String, required: true },
    language: String,
    languageContent: String,
    explanation: String,
    choices: [
      {
        type: {
          type: String,
          required: true,
          enum: ["Checkbox", "Radio"],
          default: "Checkbox",
        },
        arr: [
          {
            name: { type: String, required: true, maxLength: 15 },
            label: { type: String, required: true, maxLength: 15 },
          },
        ],
      },
    ],
    expectedAnswers: [
      {
        name: { type: String, required: true, maxLength: 15 },
        value: String,
      },
    ],
  }
);


exports.model = mongoose.model("Question", QuestionSchema);
exports.titleRegex = mongoose.model("Question", QuestionSchema);
