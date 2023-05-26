const express = require("express");
const rewardsController = require("../controllers/RewardsController");
const router = express.Router();

router.get("/rewards", rewardsController.userRewards)
router.post("/rewards", rewardsController.addReward)
router.get("/rewards/:id", rewardsController.viewReward)
router.put("/rewards/:id", rewardsController.updateReward)
router.delete("/rewards/:id", rewardsController.deleteReward);
router.get("/rewardsList", rewardsController.listOfRewards)
router.get("/redemptions", rewardsController.listOfRedemptions)
router.post("/redemptions", rewardsController.addRedemption)
router.post("/registerApp", rewardsController.registerApp)

module.exports = router;
