const router = require("express").Router();
const swellController = require("../../controller/swellController");

router.route("/saveSwell").post(swellController.createSwell);
router.route("/").get(swellController.findAllSessions);
router
  .route("/:id")
  .get(swellController.findSession)
  .delete(swellController.deleteSession);

module.exports = router;
