const router = require("express").Router();
const swellController = require("../../controller/swellController");

router.route("/saveSwell").post(swellController.createSwell);

module.exports = router;
