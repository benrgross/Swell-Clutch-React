const router = require("express").Router();
const reportController = require("../../controller/reportController");

router.route("/report/:spot").get(reportController.getReport);
router.route("/search/:spot").get(reportController.searchSpots);

module.exports = router;
