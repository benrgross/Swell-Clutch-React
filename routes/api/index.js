const router = require("express").Router();
const cheerioRoutes = require("./cheerio");
const puppetRoutes = require("./puppet");
const surflineRoutes = require("./surfline");

router.use("/cheerio", cheerioRoutes);
router.use("/puppet", puppetRoutes);
router.use("/surfline", surflineRoutes);

module.exports = router;
