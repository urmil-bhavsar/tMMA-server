const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
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
        },
    },
    { timestamps: true }
);

const Role = mongoose.model("Role", roleSchema);

module.exports = { Role };
