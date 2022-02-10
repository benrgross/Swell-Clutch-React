const router = require("express").Router();
const cheerio = require("cheerio");
const axios = require("axios");

router.get("/getspots/:spot", async (req, res) => {
  console.log(req.params);

  try {
    const results = [];

    const { data } = await axios.get(
      `https://www.surfline.com/search/${req.params.spot}`
    );

    const $ = await cheerio.load(data);

    $("#surf-spots > div > div").each((i, element) => {
      let href = $(element).children("a").attr("href");
      let spotId = href.split("/")[5];
      let nameFromRef = href.split("/");
      let name = nameFromRef[4].split("-").join(" ");

      const spot = {
        name: name,
        spotId: spotId,
        href: href,
      };
      results.push(spot);
    });

    res.status(200).json(results);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
});

module.exports = router;
