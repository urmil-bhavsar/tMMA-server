const { asyncHandler } = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const messages = require("../utils/messages");
const { Board } = require("../models/board.model");

class AcademicsController {
    createBoard = asyncHandler(async (req, res) => {
        console.log("in")
        console.log(req.body)
        const { name } = req.body
        const user = req.user
        const boardExists = await Board.findOne({ name: name })
        if (boardExists) {
            throw new ApiError(400, messages.ERROR.BOARD_EXISTS)
        } else {
            const board = await Board.create({
                name: name,
                createdBy: user._id
            })

            const createdBoard = await Board.findById(board._id)
            if (!createdBoard) {
                throw new ApiError(500, messages.ERROR.BOARD_CREATE)
            }

            return res.status(201).json(new ApiResponse(200, createdBoard, messages.SUCCESS.BOARD_CREATE))
        }
    })

    editBoard = asyncHandler(async (req, res) => {

    })
}


const academicsController = new AcademicsController();
module.exports = academicsController;
