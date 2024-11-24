const Joi = require("joi")

const boardSchema = Joi.object({
    name: Joi.string().required(),
})

module.exports = boardSchema