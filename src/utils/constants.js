const bcrypt = require("bcrypt");

class Constants {
    isPasswordCorrect = async (password, hashedPassword) => {
        return await bcrypt.compare(password, hashedPassword)
    }
}

const constants = new Constants()
module.exports = constants