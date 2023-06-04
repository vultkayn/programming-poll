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

async function findSectionDocs({ category, parentPath, sectionName }) {
  const subRelPath = category?.path ?? parentPath;
  let section = [];
  switch (sectionName) {
    case "subcategories":
      section = await Category.find({ relPath: subRelPath }).exec();
      break;
    case "exercises":
      if (category === undefined || category === null)
        throw new Error(
          "'exercises' can only be found with a defined category"
        );
      section = await Exercise.find({ category: category._id }).exec();
      break;
    default:
      throw new Error(
        `such sectionName ${sectionName} has not been implemented yet`
      );
  }
  return section;
}
async function buildSection({ title, parentPath, name, category }) {
  const sectionDocuments = await findSectionDocs({
    category,
    parentPath,
    sectionName: name,
    name,
  });
  const listing = sectionDocuments
    ? sectionDocuments.map((sub) => {
        return {
          path: sub.path,
          name: sub.name,
          kind: sub.kind,
          solved: sub.solved,
        };
      })
    : [];

  return { title, listing };
}

exports.subcategories = [
  pathParamValidator,
  validateSanitization,
  async (req, res) => {
    const { relPath, uriName } = splitURIPath(req.params.path, "-");
    const category = await Category.findOne({
      relPath: relPath,
      uriName: uriName,
    }).exec();
    // BUG deal with error if not found.
    const subCats = await findSectionDocs({
      category,
      sectionName: "subcategories",
    }).exec();
    return res.json(subCats);
  },
];

exports.exercises = [
  pathParamValidator,
  validateSanitization,
  async (req, res) => {
    const { relPath, uriName } = splitURIPath(req.params.path, "-");
    const category = await Category.findOne({
      relPath: relPath,
      uriName: uriName,
    }).exec();
    // BUG deal with error if not found.
    const exos = await findSectionDocs({
      category,
      sectionName: "exercises",
    }).exec();
    return res.json(exos);
  },
];

exports.index = async (req, res) => {
  return Promise.all(
    indexCategories.map(async (cat) => {
      return {
        path: cat.path,
        name: cat.name,
        solved: cat.solved,
        description: cat.description,
        sections: [
          await buildSection({
            title: "Subcategories",
            name: "subcategories",
            parentPath: "",
          }),
        ],
      };
    })
  ).then((result) => res.json(result));
};

exports.request = [
  pathParamValidator,
  validateSanitization,
  async (req, res) => {
    const uriPath = req.params.path;
    const { relPath, uriName } = splitURIPath(uriPath, "-");
    const category = await Category.findOne({
      relPath: relPath,
      uriName: uriName,
    }).exec();
    // BUG deal with error if not found.

    let sections = [];
    const subs = await buildSection({
      title: "Subcategories",
      parentPath: category.path,
      name: "subcategories",
    });
    if (subs.listing.length) sections.push(subs);

    const exos = await buildSection({
      title: "Exercises",
      parentPath: category.path,
      name: "exercises",
    });
    if (exos.listing.length) sections.push(exos);

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
  validateSanitization,
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
  validateSanitization,
  async (req, res) => {
    const { relPath, uriName } = splitURIPath(req.params.path);
    const cat = await Category.findOne({
      relPath: relPath,
      uriName: uriName,
    });

    async function subDocsTreeDeletion(category) {
      // delete all subcategories if the path change.
      const subDocs = await findSectionDocs({
        category: cat,
        sectionName: "subcategories",
      });
      if (subDocs.length === 0) return;
      await Promise.all(
        subDocs.forEach(async (sub) => {
          await subDocsTreeDeletion(sub); // to trigger pre('deleteOne') hook
          return await sub.deleteOne();
        })
      );
    }

    let delSubCats = true; // TODO change that for optional deletion functionality
    delSubCats ? await subDocsTreeDeletion(cat) : await cat.deleteOne();
    // FIXME for optional functionality, the subcategories should be moved one level up
    
    return res.sendStatus(200);
  },
];

exports.update = [
  checkAuth(),
  pathParamValidator,
  body("name").optional().escape().custom(customNameMatchesURIValidator("-")),
  body("description").optional().escape(),
  validateSanitization,
  
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
    // FIXME for optional functionality, the subcategories should be renamed if this one is renamed
    
    return res.sendStatus(200);
  },
];
