const {
  Category,
  splitURIPath,
  pathRegex,
} = require("../models/categoryModel");
const { Exercise } = require("../models/exerciseModel");
const { checkAuth } = require("../passport/authenticate");
const { validateSanitization } = require("../sanitizers");

const { param, body } = require("express-validator");

const pathParamValidator = param("path")
  .escape()
  .notEmpty()
  .custom((value) => pathRegex.test(value));

/**
 * Middleware to validate that the given User Interface name, once formatted, matches the "name" component of the uriPath.
 * @param {String} sep Separator used to distinguished the path and the name.
 * @returns Nothing
 */
const customNameMatchesURIValidator =
  (sep = "-") =>
  (uiname, { req }) => {
    const { uriName } = splitURIPath(req.params.path, sep);
    if (uriName !== uiName2uriName(uiname))
      throw new Error("ill-formed name does not match category path");
    return true;
  };

/**
 *
 * @param {String} uiName The name as given in the User Interface, i.e. without much validation and processing
 * @returns uriName = String: A uri friendly formatted name, as could appear suffixed to relPath in a uri
 */
function uiName2uriName(uiName) {
  const formatNameURI = (filteredName) => {
    return filteredName
      .replaceAll(/[^a-zA-Z0-9-+_ ]/g, "")
      .replaceAll("-", "_")
      .replaceAll(" ", "_");
  };

  const pureName = uiName.replaceAll(/[^\w ._,+-]/g, "");
  return formatNameURI(pureName);
}

async function findSection(category, sectionName) {
  const subRelPath = category.path;
  let section = [];
  switch (sectionName) {
    case "subcategories":
      section = await Category.find({ relPath: subRelPath }).exec();
      break;
    case "exercises":
      section = await Exercise.find({ category: category._id }).exec();
      break;
    default:
      throw new Error(
        `such sectionName ${sectionName} has not been implemented yet`
      );
  }
  return section
    ? section.map((sub) => {
        return {
          path: sub.path,
          name: sub.name,
          kind: sub.kind,
          solved: sub.solved,
        };
      })
    : [];
}

exports.list = async (req, res) => {
  const indexCategories = await Category.find({ relPath: "" }).exec();
  return Promise.all(
    indexCategories.map(async (cat) => {
      return {
        path: cat.path,
        name: cat.name,
        solved: cat.solved,
        description: cat.description,
        sections: [
          {
            title: "Subcategories",
            listing: await findSection(cat, "subcategories"),
          },
        ],
      };
    })
  ).then((result) => res.json(result));
};

exports.detail = [
  pathParamValidator,

  async (req, res) => {
    const uriPath = req.params.path;
    const { relPath, uriName } = splitURIPath(uriPath, "-");
    const category = await Category.findOne({
      relPath: relPath,
      uriName: uriName,
    }).exec();
    // BUG deal with error if not found.

    let sections = [];
    const subs = await findSection(category, "subcategories");
    if (subs.length)
      sections.push({
        title: "Subcategories",
        listing: subs,
      });

    const exos = await findSection(category, "exercises");
    if (exos.length)
      sections.push({
        title: "Exercises",
        listing: exos,
      });

    return res.json({
      name: category.name,
      path: category.path,
      solved: category.solved,
      description: category.description,
      sections: sections,
    });
  },
];

exports.create = [
  // hasAccessRights(ACCESS.W + ),
  checkAuth(),
  body("name").escape().notEmpty().custom(customNameMatchesURIValidator("-")),
  async (req, res) => {
    const { name, description, path } = req.body;
    let category = new Category({
      name: name,
      description: description,
      relPath: path,
      uriName: uiName2uriName(name),
    });
    await category.save();
    return res.json({
      name: category.name,
      path: category.path,
    });
  },
];

exports.delete = [
  checkAuth(),
  pathParamValidator,
  async (req, res) => {
    const { relPath, uriName } = splitURIPath(req.params.path);
    await Category.findOneAndDelete({
      relPath: relPath,
      uriName: uriName,
    });

    return res.sendStatus(200);
  },
];

exports.update = [
  checkAuth(),
  pathParamValidator,
  body("name").optional().escape().custom(customNameMatchesURIValidator("-")),
  body("description").optional().escape(),

  async (req, res) => {
    const { relPath, uriName } = splitURIPath(req.params.path);
    let updates = {};
    if (req.body.description) updates.description = req.body.description;
    if (req.body.name) {
    }

    await Category.updateOne(
      { relPath: relPath, uriName: uriName },
      { ...updates }
    );

    // FIXME update all exercises and subcategories if the path change.

    return res.sendStatus(200);
  },
];
