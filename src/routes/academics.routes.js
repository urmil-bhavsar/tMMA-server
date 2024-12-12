const express = require("express");
const academicsController = require("../controllers/academics.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");
const validateRequestBody = require("../middlewares/joi.validator");
const boardSchema = require("../validators/board.schema");
const academicsRouter = express.Router();

academicsRouter.route("/createBoard").post(verifyJWT, validateRequestBody(boardSchema), academicsController.createBoard);
academicsRouter.route("/editBoard").patch(verifyJWT, academicsController.editBoard);
academicsRouter.route('/boards').get(verifyJWT, academicsController.getAllBoards)


module.exports = academicsRouter