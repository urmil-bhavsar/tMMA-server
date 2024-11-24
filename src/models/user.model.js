const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            default: '',
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        roleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
        },
        contactNumber: {
            type: String,
            // required: true
        },
        avatar: {
            type: String,
        },
        dateOfJoining: {
            type: Date,
            default: new Date()
        },
        otp: {
            type: String,
        },
        otpExpiry: {
            type: String,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
        isActive: {
            type: Boolean,
            default: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);


// whenever save function is called, check if the password is modified, if so, encrpyt it 
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, process.env.SALT_ROUNDS)
    next()
})

// to compare password with the hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName
        },
        process.env.ACCESS_TOKEN_SECRET,
        // {
        //     expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        // }
    )
}

const User = mongoose.model("User", userSchema);

module.exports = { User };
