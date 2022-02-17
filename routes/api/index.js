const router = require("express").Router();
const puppetRoutes = require("./puppet");
const surflineRoutes = require("./surf");
const dbRoutes = require("./db");

router.use("/puppet", puppetRoutes);
router.use("/surf", surflineRoutes);
router.use("/swell", dbRoutes);

module.exports = router;
