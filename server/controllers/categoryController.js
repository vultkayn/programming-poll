const { Category } = require("../models/categoryModel");
const { hasAccessRights, ACCESS } = require("../passport/authenticate");

function uriPath2DatabasePath(uriPath, sep = "-") {
  if (!uriPath) return uriPath;
  const lastSepPos = uriPath.lastIndexOf(sep);
  if (lastSepPos === -1) return uriPath;
  return uriPath.slice(0, lastSepPos);
}

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

const validateParsedNameEqualsGivenName = (sep = "-") =>
  function (req, res, next) {
    const uriPath = req.params.path;
    const name = req.body.name;
    const relPath = uriPath2DatabasePath(uriPath);
    const uriName =
      relPath.length === uriPath.length
        ? uriPath
        : uriPath.replace(relPath + sep, "");
    if (uriName !== uiName2uriName(name))
      return next({
        status: 400,
        errors: { name: "ill-formed name does not match category path" },
      });
    next();
  };

function findSection(category, sectionName) {
  return category.sections
    ? category.sections[sectionName].map((sub) => {
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
  const result = indexCategories.map((cat) => {
    return {
      path: cat.path,
      name: cat.name,
      solved: cat.solved,
      description: cat.description,
      sections: [
        {
          title: "Subcategories",
          listing: findSection(cat, "subcategories"),
        },
      ],
    };
  });
  res.json(result);
};

exports.detail = async (req, res) => {
  const uriPath = req.params.path;
  const category = await Category.findOne({
    path: uriPath2DatabasePath(uriPath),
  }).exec();
  // BUG deal with error if not found.

  let sections = [];
  const subs = findSection(category, "subcategories");
  if (subs.length)
    sections.push({
      title: "Subcategories",
      listing: subs,
    });

  const exos = findSection(category, "exercises");
  if (exos.length)
    sections.push({
      title: "Exercises",
      listing: exos,
    });

  res.json({
    name: category.name,
    path: category.path,
    solved: category.solved,
    description: category.description,
    sections: sections,
  });
};

exports.create = [
  // hasAccessRights(ACCESS.W + ),
  checkAuth(),
  validateParsedNameEqualsGivenName("-"),
  (req, res) => {
    const data = req.body;
    let category = new Category({
      relPath: uriPath2DatabasePath(data.path),
      name: data.name,
      description: data.description,
      // FIXME insert sections when creating category
    });
  },
];

exports.delete = (req, res) => {
  res.send("NOT IMPLEMENTED: category delete POST");
};

exports.update = (req, res) => {
  res.send("NOT IMPLEMENTED: category update GET");
};
