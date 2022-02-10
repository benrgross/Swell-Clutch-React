const router = require("express").Router();
const cheerioRoutes = require("./cheerio");
const puppetRoutes = require("./puppet");

router.use("/cheerio", cheerioRoutes);
router.use("/puppet", puppetRoutes);

module.exports = router;
