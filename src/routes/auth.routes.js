const express = require("express");
const authController = require("../controllers/auth.controller");
const authRouter = express.Router();

authRouter.route("/superAdminLogin").post(authController.superAdminLogin);


module.exports = authRouter