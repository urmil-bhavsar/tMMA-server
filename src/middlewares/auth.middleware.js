const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiError");
const { asyncHandler } = require("../utils/asyncHandler");
const { User } = require("../models/user.model");
const messages = require("../utils/messages");

verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, messages.ERROR.UNAUTHORIZED_ACCESS)
        }

        console.log("TOKEN  ", token)
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password")
        console.log(user)
        if (!user) {
            throw new ApiError(401, messages.ERROR.INVALID_TOKEN)
        }
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || messages.ERROR.INVALID_TOKEN)
    }
})


module.exports = { verifyJWT }