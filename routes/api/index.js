const router = require("express").Router();

const surflineRoutes = require("./surf");
const dbRoutes = require("./db");

router.use("/surf", surflineRoutes);
router.use("/session", dbRoutes);

module.exports = router;
