const RewardModel = require("../models/RewardModel");
const RedeemModel = require("../models/RedeemModel");
const RewardUserModel = require("../models/RewardUserModel");
const apiResponse = require("../helpers/apiResponse");
const { asyncHandler, authUser, apiKeyAuth, roleAuth } = require("../middlewares/jwt");
const RewardConfigModel = require("../models/RewardConfigModel");
const cuid = require("cuid");

exports.userRewards = [
    authUser,
    async function (req, res) {
        try {
            const { appId } = req.headers;
            const rewards = await RewardUserModel.findOne({ appId, userId: req.user.id })
            return apiResponse.successResponseWithData(res, "User Rewards", rewards)
        }
        catch (err) {
            console.log(err);
            return apiResponse.errorResponse(err);
        }
    }
]

exports.listOfRewards = [
    authUser,
    async function (req, res) {
        try {
            const { appId } = req.headers;
            const rewards = await RewardModel.find({ appId, userId: req.user.id })
            return apiResponse.successResponseWithData(res, "List of Rewards", rewards)
        }
        catch (err) {
            console.log(err);
            return apiResponse.errorResponse(err);
        }
    }
]

exports.viewReward = [
    authUser,
    async function (req, res) {
        try {
            const { id } = req.params;
            const reward = await RewardModel.findById(id)
            return apiResponse.successResponseWithData(res, "View Reward", reward)
        }
        catch (err) {
            console.log(err);
            return apiResponse.errorResponse(err);
        }
    }
]

exports.updateReward = [
    asyncHandler(apiKeyAuth),
    asyncHandler(roleAuth),
    async function (req, res) {
        try {
            const { id } = req.params;
            const reward = await RewardModel.findByIdAndUpdate(id, { $set: req.body });
            return apiResponse.successResponseWithData(res, "Update Reward", reward)
        }
        catch (err) {
            console.log(err);
            return apiResponse.errorResponse(err);
        }
    }
]

exports.deleteReward = [
    asyncHandler(apiKeyAuth),
    asyncHandler(roleAuth),
    async function (req, res) {
        try {
            const { id } = req.params;
            const reward = await RewardModel.findByIdAndDelete(id);
            return apiResponse.successResponseWithData(res, "Delete Reward", reward)
        }
        catch (err) {
            console.log(err);
            return apiResponse.errorResponse(err);
        }
    }
]

exports.addReward = [
    asyncHandler(apiKeyAuth),
    asyncHandler(roleAuth),
    async function (req, res) {
        try {
            const { appId } = req.headers;
            const reward = new RewardModel(...req.body, appId);
            await reward.save();
            return apiResponse.successResponseWithData(res, "Reward Added", reward)
        }
        catch (err) {
            console.log(err);
            return apiResponse.errorResponse(err);
        }
    }
]

exports.addRedemption = [
    asyncHandler(apiKeyAuth),
    asyncHandler(roleAuth),
    async function (req, res) {
        try {
            const { appId } = req.headers;
            const reward = new RedeemModel(...req.body, appId);
            await reward.save();
            return apiResponse.successResponseWithData(res, "Reward Added Successfully", reward)
        }
        catch (err) {
            console.log(err);
            return apiResponse.errorResponse(err);
        }
    }
]

exports.listOfRedemptions = [
    authUser,
    async function (req, res) {
        try {
            const { appId } = req.headers;
            const rewards = await RedeemModel.find({ appId, userId: req.user.id })
            return apiResponse.successResponseWithData(res, "List of Redemptions", rewards)
        }
        catch (err) {
            console.log(err);
            return apiResponse.errorResponse(err);
        }
    }
]

exports.registerApp = [
    async function (req, res) {
        try {
            const newApp = new RewardConfigModel({ ...req.body, appId: cuid(), apiKeys: ["API" + cuid()] });
            await newApp.save();
            return apiResponse.successResponseWithData(res, "App Register Successfully", newApp);
        }
        catch (err) {
            console.log(err);
            return apiResponse.errorResponse(err)
        }
    }
]