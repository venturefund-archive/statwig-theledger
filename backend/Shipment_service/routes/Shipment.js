var express = require("express");
const shipmentController = require("../controllers/shipmentController");

var router = express.Router();

router.get("/shipmentStatistics", shipmentController.shipmentStatistics);
router.get("/fetchShipments", shipmentController.fetchShipments);
router.post("/createShipment", shipmentController.createShipment);
router.get("/reviewShipment", shipmentController.reviewShipment);
router.get("/verifyShipment", shipmentController.verifyShipment);
router.post("/modifyShipment", shipmentController.modifyShipment);


module.exports = router;