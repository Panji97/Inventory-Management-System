var express = require("express");
var router = express.Router();

const unitController = require("../controllers/unitController");

router.get("/unit-all", unitController.getAllUnit);

router.get("/unit-add", unitController.addUnit);

router.post("/unit-create", unitController.createUnit);

router.get("/unit-edit-:id", unitController.editUnit);

router.post("/unit-update-:id", unitController.updateUnit);

router.get("/unit-delete-:id", unitController.deleteUnit);

module.exports = router;
