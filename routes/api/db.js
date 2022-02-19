const router = require("express").Router();
const swellController = require("../../controller/swellController");

router.route("/saveSwell").post(swellController.createSwell);
router.route("/:email").get(swellController.findAllSessions);
router.route("/spot/:id").get(swellController.findSessionsOnLocation);
router
  .route("/:id")
  .get(swellController.findSession)
  .delete(swellController.deleteSession);

module.exports = router;
