const ApiError = require("../utils/apiError");

const validateRequestBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {
            // return res.status(400).json({
            //     message: 'Validation failed',
            //     details: error.details.map((detail) => detail.message),
            // });
            throw new ApiError(400, 'Validation failed',
                error.details.map((detail) => detail.message))
        }
        next();
    };
};

module.exports = validateRequestBody;
