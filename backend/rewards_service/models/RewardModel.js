const mongoose = require("mongoose");

const RewardSchema = new mongoose.Schema(
    {
        eventID: { type: String, required: true },
        eventTime: { type: Date, required: true },
        event: { type: String, required: true },
        eventType: { type: String, required: true },
        userId: { type: String, required: true },
        userOrgId: { type: String, required: true },
        userWarehouseId: { type: String, required: true },
        secondaryUserId: { type: String, default: null },
        secondaryOrgId: { type: String, default: null },
        secondaryWarehouseId: { type: String, default: null },
        points: { type: Number, default: 0 },
        redeemed: { type: Boolean, default: false },
        redeemedAt: { type: Date }
    },
    { timestamps: true }
);

module.exports = mongoose.model("reward", RewardSchema);
