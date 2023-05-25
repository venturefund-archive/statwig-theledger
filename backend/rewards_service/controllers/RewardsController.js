const RewardModel = require("../models/RewardModel");
const RewardConfigModel = require("../models/RewardConfigModel");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");

exports.userRewards = [
    auth,
    async function (req, res) {
        try {
            const { role } = req.user;
            const isRoleAvailable = await RewardConfigModel.findOne({})
        }
        catch (err) {
            console.log(err);
            return apiResponse.errorResponse(err);
        }
    }
]

exports.addReward = [
    auth,
    async function (req, res) {
        try {
            const { role } = req.user;
            const isRoleAvailable = await RewardConfigModel.findOne({})
        }
        catch (err) {
            console.log(err);
            return apiResponse.errorResponse(err);
        }
    }
]

exports.listOfRewards = [
    auth,
    async function (req, res) {
        try {
            const { role } = req.user;
            const isRoleAvailable = await RewardConfigModel.findOne({})
        }
        catch (err) {
            console.log(err);
            return apiResponse.errorResponse(err);
        }
    }
]