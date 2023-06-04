const { Attempt } = require("../models/attemptModel");
const {
  pathRegex,
  Category,
  splitURIPath,
} = require("../models/categoryModel");
const { Exercise, nameRegex } = require("../models/exerciseModel");
const { Question } = require("../models/questionModel");
const userModel = require("../models/userModel");
const { checkAuth } = require("../passport/authenticate");
const { validateSanitization } = require("../sanitizers");
const { body } = require("express-validator");

const { uiName2uriName } = require("./validators").practice;
const nameMatchesURI = (uiname, { req }) => {
  const uriName = req.params.name;
  if (uriName !== uiName2uriName(uiname))
    throw new Error("ill-formed name does not match category path");
  return true;
};

exports.questions = [
  validateSanitization,
  async (req, res) => {
    const { relPath, uriName } = splitURIPath(req.params.path);
    const category = await Category.findOne({
      relPath: relPath,
      uriName: uriName,
    }).exec();

    const exo = await Exercise.findOne({
      category: category._id,
      uriName: req.params.name,
    }).exec();

    exo.populate("questions");
    return res.json(exo.questions);
  }];

// light version (questions are not populated)
exports.request = [
  validateSanitization,
  async (req, res) => {
    const { relPath, uriName } = splitURIPath(req.params.path);
    const category = await Category.findOne({
      relPath: relPath,
      uriName: uriName,
    }).exec();

    const exo = await Exercise.findOne({
      category: category._id,
      uriName: req.params.name,
    }).exec();

    await exo.populate("category");

    const user = (req.user) ? await userModel.findById(req.user.id).exec() : null;
    let attempt = null;
    if (user._id)
      attempt = await Attempt.findOne({exercise: exo._id, by: user._id}).exec();

    let result = exo.toObject();
    result.solved = attempt?.solved ?? false;
    if (attempt) {
      result.answers = attempt.answers;
      result.submissionDate = attempt.submissionDate; 
    }
    return res.json(result);
  },
];

exports.create = [
  checkAuth(),

  body("name")
    .escape()
    .notEmpty()
    .custom((v) => nameRegex.test(v)),
  body("statement").escape().notEmpty(),
  body("questions").isArray({ min: 1 }).escape(), // TODO add validation of the question objects
  body("category")
    .isString()
    .escape()
    .notEmpty()
    .custom((v) => pathRegex.test(v)),
  validateSanitization,

  async (req, res) => {
    const { relPath, uriName } = splitURIPath(req.params.path);
    const category = await Category.findOne({
      relPath: relPath,
      uriName: uriName,
    }).exec();

    // get user info
    const authorID = req.user.id; // INFO should be fine since checkAuth passed

    // create questions
    const questionIDs = await Promise.all(
      req.body.questions.map(async (quest) => {
        // FIXME validation is basically done below, it hsould be moved into a custom valdiator
        let choices = quest.choices.map((c) => {
          return {
            type: c.type,
            arr: c.arr, // TODO validate this
          };
        });
        const q = new Question({
          title: quest.title,
          statement: quest.statement,
          language: quest.language ?? "",
          languageContent: quest.languageContent ?? "",
          explanation: quest.explanation ?? "",
          choices: choices,
          expectedAnswers: quest.expectedAnswers,
        });
        const doc = await q.save();
        return doc._id;
      })
    );

    let exercise = new Exercise({
      name: req.body.name,
      uriName: uiName2uriName(req.body.name),
      statement: req.body.statement,
      category: category._id,
      lastModifiedBy: authorID,
      questions: questionIDs,
    });
    await exercise.save();
    return res.json(exercise);
  },
];

exports.delete = [
  checkAuth(),
  validateSanitization,

  async (req, res) => {
    // TODO should delete all attempts made by user of this exercise
    const { relPath, uriName } = splitURIPath(req.params.path);
    const category = await Category.findOne({
      relPath: relPath,
      uriName: uriName,
    }).exec();

    const exo = await Exercise.findOne({
      category: category._id,
      uriName: req.params.name,
    }).exec();
    const qIDS = exo.questions;
    await Promise.all(
      qIDS.forEach(async (qid) => {
        await Question.findByIdAndDelete(qid);
      })
    );

    res.sendStatus(200);
  },
];

exports.update = [
  checkAuth(),

  body("name")
    .optional()
    .escape()
    .notEmpty()
    .custom((v) => nameRegex.test(v))
    .custom(nameMatchesURI),
  body("statement").optional().escape().notEmpty(),
  body("category")
    .optional()
    .isString()
    .escape()
    .notEmpty()
    .custom((v) => pathRegex.test(v)),
  validateSanitization,

  async (req, res) => {
    const { relPath, uriName } = splitURIPath(req.params.path);
    const category = await Category.findOne({
      relPath: relPath,
      uriName: uriName,
    }).exec();

    let updates = {};
    if (req.body.statement) updates.statement = req.body.statement;
    if (req.body.category) {
      const newpath = splitURIPath(req.body.category);
      updates.category = await Category.findOne({
        relPath: newpath.relPath,
        uriName: newpath.uriName,
      }).exec();
    }
    if (req.body.name) {
      updates.name = req.body.name;
      updates.uriName = uiName2uriName(updates.name);
    }

    await Exercise.findOneAndUpdate(
      {
        category: category._id,
        uriName: req.params.name,
      },
      updates
    ).exec();
    return res.sendStatus(200);
  },
];

exports.submitQuest = (req, res) => {
  res.send("NOT IMPLEMENTED: exercise update GET");
};

exports.updateQuest = (req, res) => {
  res.send("NOT IMPLEMENTED: exercise update GET");
};
