const router = require("express").Router();
const cheerioRoutes = require("./cheerio");
const puppetRoutes = require("./puppet");
const surflineRoutes = require("./surf");

router.use("/cheerio", cheerioRoutes);
router.use("/puppet", puppetRoutes);
router.use("/surf", surflineRoutes);

module.exports = router;
