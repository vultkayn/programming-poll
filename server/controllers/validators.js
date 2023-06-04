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
};

module.exports = { practice: practice };
