const mongoose = require("mongoose");
const { Schema } = mongoose;

const nameRegex = /[\w ._,+-]{1,30}/;

const ExerciseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [1, "Cannot have an empty name"],
      maxLength: 30,
      validate: {
        validator: (v) => {
          return nameRegex.test(v);
        },
        message: "Invalid format of the name",
      },
    },
    uriName: {
      type: String,
      required: true,
      validate: {
        validator: (v) => {
          return pathRegex.test(v);
        },
        message: "Invalid format of the uri name",
      },
    },
    description: { type: String, required: true },
    lastModified: { type: Date, default: Date.now, required: true },
    lastModifiedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ExerciseSchema.virtual("kind").get(() => 1);
ExerciseSchema.virtual("solved").get(() => true);
ExerciseSchema.virtual("path").get(function () {
  const formatNameURI = (filteredName) => {
    return filteredName
      .replaceAll(/[^a-zA-Z0-9-+_ ]/g, "")
      .replaceAll("-", "_")
      .replaceAll(" ", "_");
  };
  const pureNameURI = formatNameURI(this.name);
  return this.category.path + "/" + pureNameURI;
});

exports.Exercise = mongoose.model("Exercise", ExerciseSchema);
exports.nameRegex = nameRegex;
