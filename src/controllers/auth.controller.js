const { asyncHandler } = require("../utils/asyncHandler");
const { User } = require("../models/user.model");
const { Role } = require("../models/role.model");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const messages = require("../utils/messages");
const { decryptData, encryptData } = require("../utils/crypto");

class AuthController {
    generateAccessToken = async (userId) => {
        try {
            const user = await User.findById(userId)
            const accessToken = user.generateAccessToken()

            await user.save({ validateBeforeSave: false })
            return accessToken
        } catch (error) {
            throw new ApiError(500, messages.ERROR.ACCESS_TOKEN_GENERATION)
        }
    }

    superAdminLogin = asyncHandler(async (req, res) => {
        const data = decryptData(req.body)
        console.log(data, "BODYYys")
        const { email, password } = data;
        if (!email || !password) {
            throw new ApiError(400, messages.ERROR.INSUFFICIENT_CREDENTIALS)
        }

        const superAdmin = await User.findOne({ email: email })
        console.log(superAdmin, "ADMIN")
        if (!superAdmin) {
            console.log("innnnnn")
            throw new ApiError(400, messages.ERROR.USER_DOESNOT_EXIST)
        }

        const roleData = await Role.findById(superAdmin.roleId)
        if (!roleData) {
            throw new ApiError(401, messages.ERROR.UNAUTHORIZED_ACCESS)
        }
        
        if (roleData.role === 'superAdmin') {
            const isPasswordCorrect = await superAdmin.isPasswordCorrect(password)
            if (!isPasswordCorrect) {
                throw new ApiError(401, messages.ERROR.USER_CREDENTIALS)
            }
            const accessToken = await this.generateAccessToken(superAdmin._id)
            const loggedInUser = await User.findById(superAdmin._id).select("-password -createdAt -dateOfJoining -deletedAt")
            console.log(loggedInUser)

            const options = {
                httpOnly: true,
                secure: true
            }
            return res.status(200).cookie('accessToken', accessToken, options).json(new ApiResponse(200, { user: loggedInUser, accessToken: accessToken }, messages.SUCCESS.LOGIN))
        } else {
            throw new ApiError(401, messages.ERROR.UNAUTHORIZED_ACCESS)
        }
    })

    getLoggedInUserInfo = asyncHandler(async (req, res) => {
        console.log(req.query, "PARAMS")
        const userId = req.query.id;
        const user = await User.findById(userId).select("-password -createdAt -dateOfJoining -deletedAt")
        console.log(user)

        if (!user) {
            console.log("innnnnn")
            throw new ApiError(400, messages.ERROR.USER_DOESNOT_EXIST)
        }
        return res.status(200).json(new ApiResponse(200, encryptData(user), messages.SUCCESS.USER_INFO))
    })
}


const authController = new AuthController();
module.exports = authController;
