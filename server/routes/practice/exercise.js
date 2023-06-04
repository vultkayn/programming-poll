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
router.post("/:name/:qid", exerciseCtrl.submitQuest);
router.put("/:name/:qid", exerciseCtrl.updateQuest);

module.exports = router;
