var express = require("express");
var router = express.Router();

const resourceController = require("../controllers/resourceController");

router.get("/resource-all", resourceController.getAllResource);

router.get("/resource-add", resourceController.addResource);

router.post("/resource-create", resourceController.createResource);

router.get("/resource-edit-:id", resourceController.editResource);

router.post("/resource-update-:id", resourceController.updateResource);

router.get("/resource-delete-:id", resourceController.deleteResource);

module.exports = router;
