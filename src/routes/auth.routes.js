const express = require("express");
const authController = require("../controllers/auth.controller");
const authRouter = express.Router();

authRouter.route("/superAdminLogin").post(authController.superAdminLogin);
authRouter.route("/getUserInfo").get(authController.getLoggedInUserInfo);

module.exports = authRouter