const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");

const headers = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
  },
};
router.post("/report", async (req, res) => {
  try {
    const { data } = await axios.get(
      `http://services.surfline.com/kbyg/spots/forecasts/wave?spotId=${req.body.spotId}`,
      headers
    );

    const { lat, lon } = data.associated.location;

    const results = await axios.get(
      `http://services.surfline.com/kbyg/mapview/spot?lat=${lat}&lon=${lon}`,
      headers
    );
    res.status(200).json(results.data);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

router.get("/:spot", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://www.surfline.com/search/${req.params.spot}`,
      headers
    );

    const $ = await cheerio.load(data);
    let results = [];
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

    console.log(results);

    res.send(results);
  } catch (err) {
    res.send(err);
  }
});
module.exports = router;
