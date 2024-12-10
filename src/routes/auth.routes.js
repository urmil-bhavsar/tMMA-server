const express = require("express");
const authController = require("../controllers/auth.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");
const authRouter = express.Router();

authRouter.route("/superAdminLogin").post(authController.superAdminLogin);
authRouter.route("/getUserInfo").get(verifyJWT, authController.getLoggedInUserInfo);

module.exports = authRouter