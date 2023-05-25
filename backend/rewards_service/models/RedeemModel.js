const mongoose = require("mongoose");

const RedeemSchema = new mongoose.Schema(
    {
        appId: { type: String, required: true },
        redeemId: { type: String, required: true },
        userId: { type: String, required: true },
        userOrgId: { type: String, required: true },
        userWarehouseId: { type: String, required: true },
        points: { type: Number, default: 0, min: 0 },
        remainingPoints: { type: Number, default: 0, min: 0 },
        remarks: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model("reward", RedeemSchema);


/*
Model to be updated with new Redeem Requirements
*/