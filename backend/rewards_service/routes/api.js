const express = require("express");
const rewardsController = require("../controllers/RewardsController");
const router = express.Router();

router.get("/rewards", rewardsController.userRewards)
router.post("/addReward", rewardsController.addReward)
router.get("/rewardsList", rewardsController.listOfRewards)

module.exports = router;
