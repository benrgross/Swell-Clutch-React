const router = require("express").Router();
const cheerioRoutes = require("./guest");

router.use("/cheerio", cheerioRoutes);

module.exports = router;
