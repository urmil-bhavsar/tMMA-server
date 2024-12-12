const { asyncHandler } = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const { Board } = require("../models/board.model");
const messages = require("../utils/messages");
const { encryptData } = require("../utils/crypto");

class AcademicsController {
    // BOARD 
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
        console.log('BODY \n', req.body)
        const { name, id } = req.body
        if (!name || !id) {
            throw new ApiError(400, messages.ERROR.INSUFFICIENT_DATA)
        }
        const user = req.user;
        const board = await Board.findById(id)
        res.send(board)
        if (board) {
            const updatedData = {
                name: name,
                updatedBy: user._id
            }
            const updatedBoard = await Board.findByIdAndUpdate(id, updatedData)
            if (updatedBoard) {
                return res.status(201).json(new ApiResponse(200, createdBoard, messages.SUCCESS.BOARD_UPDATE))
            } else {
                throw new ApiError(500, messages.ERROR.SOMETHING_WENT_WRONG)
            }
        } else {
            throw new ApiError(400, messages.ERROR.BOARD_DOES_NOT_EXISTS)
        }
    })

    getAllBoards = asyncHandler(async (req, res) => {
        const boards = await Board.find().select("-createdBy -createdAt -updatedAt --deletedAt __v").sort({ updatedAt: -1 });
        console.log(boards, 'BOARDDDD')
        return res.status(200).json(new ApiResponse(200, encryptData(boards), messages.SUCCESS.BOARDS))
    })


    // STANDARD
}


const academicsController = new AcademicsController();
module.exports = academicsController;
