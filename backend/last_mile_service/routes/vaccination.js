const express = require("express");
const router = express.Router();
const VaccinationController = require("../controllers/VaccinationController");

router.post("/fetchBatchById", VaccinationController.fetchBatchById);
router.post("/vaccinateIndividual", VaccinationController.vaccinateIndividual);
router.post("/vaccinateMultiple", VaccinationController.vaccinateMultiple);
router.post("/getAllVaccinationDetails", VaccinationController.getAllVaccinationDetails);
router.post("/getVialsUtilised", VaccinationController.getVialsUtilised);
router.get("/getVaccinationDetailsByVial", VaccinationController.getVaccinationDetailsByVial);
router.get("/getAnalytics", VaccinationController.getAnalytics);
router.get("/getVaccinationsList", VaccinationController.getVaccinationsList);
router.get("/getCitiesAndOrgsForFilters", VaccinationController.getCitiesAndOrgsForFilters);
router.post("/exportVaccinationList", VaccinationController.exportVaccinationList);

module.exports = router;
