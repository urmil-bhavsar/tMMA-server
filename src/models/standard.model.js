const mongoose = require("mongoose");
const standardSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        boardIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Board"
            }
        ],
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
        },
    },
    { timestamps: true }
);

const Standard = mongoose.model("Standard", standardSchema);

module.exports = { Standard };
