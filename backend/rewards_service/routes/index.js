const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    res.status(200).json({ status: "OK", message: "Reward Service" });
});

module.exports = router;
