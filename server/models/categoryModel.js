const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pathRegex = /[a-zA-Z0-9-_+]*/;
const nameRegex = /[\w ._,+-]+/;

const CategorySchema = new Schema(
  {
    relPath: {
      type: String,
      required: [true, "Category unique path required"],
      validate: {
        validator: function (v) {
          return pathRegex.test(v);
        },
        message: "Invalid format of the category path",
      },
      trim: true,
      unique: true,
    },
    name: {
      // name.replaceAll(/[^\w ._,+-]/g, "");
      type: String,
      validate: {
        validator: (v) => {
          return nameRegex.test(v);
        },
        message: "Invalid format of the name",
      },
    },
    description: String,
    sections: {
      subcategories: [
        {
          type: Schema.Types.ObjectId,
          ref: "Category",
        },
      ],
      exercises: [
        {
          type: Schema.Types.ObjectId,
          ref: "Exercise",
        },
      ],
    },
  },
  {
    toJSON: { virtuals: true },
  }
);

CategorySchema.virtual("kind").get(() => 0);
CategorySchema.virtual("solved").get(() => true);
CategorySchema.virtual("path").get(function () {
  const formatNameURI = (filteredName) => {
    return filteredName
      .replaceAll(/[^a-zA-Z0-9-+_ ]/g, "")
      .replaceAll("-", "_")
      .replaceAll(" ", "_");
  };
  const pureNameURI = formatNameURI(this.name);
  return this.relPath + "-" + pureNameURI;
});

CategorySchema.virtual("progress").get(function () {
  // check exercises 'solved'
  return [0, 50];
});

exports.Category = mongoose.model("Category", CategorySchema);
exports.nameRegex = nameRegex;
exports.pathRegex = pathRegex;
