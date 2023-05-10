var express = require("express");
var router = express.Router();

const generalController = require("../controllers/generalController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.use(authController.protect);

router.get("/profile", generalController.profile);

router.use(authController.restrictTo("super-admin", "admin", "pic"));

router.get("/", authController.isLoggedIn, generalController.dahsboardView);

router.get("/user-all", userController.getAllUser);

module.exports = router;
