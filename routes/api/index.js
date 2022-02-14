const router = require("express").Router();

const puppetRoutes = require("./puppet");
const surflineRoutes = require("./surf");

router.use("/puppet", puppetRoutes);
router.use("/surf", surflineRoutes);

module.exports = router;
