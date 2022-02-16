const router = require("express").Router();
const axios = require("axios");

router.post("/report", async (req, res) => {
  try {
    const { data } = await axios.get(
      `http://services.surfline.com/kbyg/spots/forecasts/wave?spotId=${req.body.spotId}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
        },
      }
    );

    const { lat, lon } = data.associated.location;

    const results = await axios.get(
      `http://services.surfline.com/kbyg/mapview/spot?lat=${lat}&lon=${lon}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
        },
      }
    );
    res.status(200).json(results.data);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

module.exports = router;
