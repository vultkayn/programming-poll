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
      required: [true, "Category name required"],
    },
    uriName: {
      type: String,
      validate: {
        validator: (v) => {
          return pathRegex.test(v);
        },
        message: "Invalid format of the uri name",
      },
    },
    description: String,
  },
  {
    toJSON: { virtuals: true },
  }
);

/**
 *
 * @param {String} uriPath The full path as given in the request uri.
 * @param {String} sep Separator used to distinguished the path and the name.
 * @returns The extracted relPath part of the uriPath, identical to the unique Schema identifier.
 */
function getRelPathOfURIPath(uriPath, sep = "-") {
  if (!uriPath) return uriPath;
  const lastSepPos = uriPath.lastIndexOf(sep);
  if (lastSepPos === -1) return uriPath;
  return uriPath.slice(0, lastSepPos);
}

/**
 *
 * @param {String} uriPath The full path as given in the request uri.
 * @param {String} sep Separator used to distinguished the path and the name.
 * @returns {relPath, uriName} The relative path as the unique identifier in the Schema, and the name part of the uri.
 */
function splitURIPath(uriPath, sep = "-") {
  const relPath = getRelPathOfURIPath(uriPath);
  const uriName =
    relPath.length === uriPath.length
      ? uriPath
      : uriPath.replace(relPath + sep, "");
  return { relPath: relPath, uriName: uriName };
}

CategorySchema.virtual("kind").get(() => 0);
CategorySchema.virtual("solved").get(() => true);
CategorySchema.virtual("uriPath")
  .get(function () {
    return this.relPath + "-" + this.uriName;
  })
  .set(function (uriPath) {
    const { relPath, uriName } = splitURIPath(uriPath, "-");
    this.relPath = relPath;
    this.uriName = uriName;
  });

CategorySchema.virtual("progress").get(function () {
  // check exercises 'solved'
  return [0, 50];
});

CategorySchema.index({ relPath: 1, uriName: 1 });


const {Exercise} = require("./exerciseModel");
CategorySchema.pre('deleteOne', {document: true, query: false}, async function () {
  return await Exercise.deleteMany({category: this._id});
});


exports.Category = mongoose.model("Category", CategorySchema);
exports.nameRegex = nameRegex;
exports.pathRegex = pathRegex;
exports.splitURIPath = splitURIPath;
