const express = require("express");
const AnalyticsController = require("../controllers/AnalyticsController");
const router = express.Router();

router.post("/bestSellers", AnalyticsController.bestSellers);
router.get("/bestSellerSummary", AnalyticsController.bestSellerSummary);
router.post("/inStockReport", AnalyticsController.inStockReport);
router.post("/outOfStockReport", AnalyticsController.outOfStockReport);
router.post("/expiredStockReport", AnalyticsController.expiredStockReport);
router.post("/nearExpiryStockReport", AnalyticsController.nearExpiryStockReport);
router.get("/inStockFilterOptions", AnalyticsController.inStockFilterOptions);
router.get("/outStockFilterOptions", AnalyticsController.outOfStockFilterOptions);
module.exports = router;
