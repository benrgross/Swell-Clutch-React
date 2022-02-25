const router = require("express").Router();
const swellController = require("../../controller/swellController");

router.route("/saveSwell").post(swellController.createSwell);
router.route("/:email").get(swellController.findAllSessions);
router.route("/spot/:id").get(swellController.findSessionsOnLocation);
router
  .route("/:id")
  .get(swellController.findSession)
  .delete(swellController.deleteSessionsFromLocation);

router.route("/delete").post(swellController.deleteSessionsFromLocation);
router.route("/delete/sesh/:id").get(swellController.deleteSession);

module.exports = router;
