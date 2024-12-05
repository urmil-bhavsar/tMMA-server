const ApiError = require("../utils/apiError");
const messages = require("../utils/messages");

const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
            data: err.data,
        });
    }

    return res.status(500).json({
        success: false,
        message: messages.ERROR.SOMETHING_WENT_WRONG,
    });
};

module.exports = { errorHandler };
