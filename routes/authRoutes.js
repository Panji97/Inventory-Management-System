var express = require("express");
var router = express.Router();
const authController = require("../controllers/authController");

/* GET view */
router.get("/login", authController.loginView);

router.get("/register", authController.registerView);

router.get("/forgot-password", authController.forgotPasswordView);

/* Data Send */

router.post("/signup", authController.signUp);

router.post("/signin", authController.signIn);

router.get("/logout", authController.logout);

module.exports = router;
