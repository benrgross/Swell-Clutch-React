const router = require("express").Router();
const cheerioRoutes = require("./cheerio");

router.use("/cheerio", cheerioRoutes);

module.exports = router;
