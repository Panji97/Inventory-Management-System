var express = require("express");
var router = express.Router();

const userController = require("../controllers/userController");

router.get("/user-all", userController.getAllUser);

router.get("/user-edit-:id", userController.editUser);

router.post("/user-update-:id", userController.updateUser);

router.get("/user-delete-:id", userController.deleteUser);

module.exports = router;
