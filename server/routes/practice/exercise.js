var express = require("express");
var router = express.Router();

const exerciseCtrl = require("../../controllers/exerciseController");
const { nameParamValidator } = require("../../controllers/validators").practice;

router.use("/:name", nameParamValidator);
router.get("/:name", exerciseCtrl.request);
router.post("/", exerciseCtrl.create);
router.delete("/:name", exerciseCtrl.delete);
router.put("/:name", exerciseCtrl.update);

// questions
router.post("/:name/q", exerciseCtrl.addQuest);
router.delete("/:name/q/:qid", exerciseCtrl.dropQuest);

module.exports = router;
