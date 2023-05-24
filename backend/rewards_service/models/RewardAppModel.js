const mongoose = require("mongoose");

const RewardAppSchema = new mongoose.Schema(
    {
        appId: { type: String, required: true },
        name: { type: String },
        version: { type: String },
        events: { type: [String], default: [] },
        roles: { type: [String], default: [] },
    },
    { timestamps: true }
);

module.exports = mongoose.model("reward", RewardAppSchema);
