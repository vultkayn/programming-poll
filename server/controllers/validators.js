const { param, body } = require("express-validator");
const { pathRegex } = require("../models/categoryModel");

const practice = {
  pathParamValidator: param("path")
    .escape()
    .notEmpty()
    .custom((value) => pathRegex.test(value)),

  nameParamValidator: param("name")
    .escape()
    .notEmpty()
    .custom((value) => pathRegex.test(value)),

  /**
   *
   * @param {String} uiName The name as given in the User Interface, i.e. without much validation and processing
   * @returns uriName = String: A uri friendly formatted name, as could appear suffixed to relPath in a uri
   */
  uiName2uriName: function (uiName) {
    const formatNameURI = (filteredName) => {
      return filteredName
        .replaceAll(/[^a-zA-Z0-9-+_ ]/g, "")
        .replaceAll("-", "_")
        .replaceAll(" ", "_");
    };

    const pureName = uiName.replaceAll(/[^\w ._,+-]/g, "");
    return formatNameURI(pureName);
  },

  questionChoicesCustomValidator: (choices, { req }) => {
    if (
      !Array.isArray(choices.arr) /* ||
        req.body.expectedAnswers?.length !== choices?.arr?.length */
    )
      throw new Error(
        "choices should be in similar number than the expected number"
      );
    if (!["Checkbox", "Radio"].includes(choices?.type))
      // FIXME XSS escape this type.
      throw new Error(`a choice has an invalid type of ${type}`);
    for (const cho of choices.arr) {
      const { name, label } = cho;
      name ??= "";
      label ??= "";
      // FIXME XSS -> escape name and label
      if (typeof name !== "string" || name.length <= 0 || name.length > 15)
        throw new Error(`invalid choice name`);
      if (typeof label !== "string" || label.length <= 0 || label.length > 15)
        throw new Error(`invalid choice label`);
    }
    return true;
  },

  questionAnswersCustomValidator: (arr, { req }) => {
    // if (req.body.choices?.arr?.length !== arr.length)
    //   throw new Error(
    //     "expected answers should be in similar number than the choices"
    //   );
    for (const ans of arr) {
      const { name, value } = ans;
      name ??= "";
      value ??= "";
      // FIXME XSS -> escape name and label
      if (typeof name !== "string" || name.length <= 0 || name.length > 15)
        throw new Error(`invalid answer name`);
      if (typeof value !== "string")
        throw new Error(`answer value must be a string`);
    }
    return true;
  },
};

module.exports = { practice: practice };
