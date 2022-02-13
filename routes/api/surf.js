const router = require("express").Router();
const axios = require("axios");

router.post("/report", async (req, res) => {
  try {
    const { data } = await axios.get(
      `http://services.surfline.com/kbyg/spots/forecasts/wave?spotId=${req.body.spotId}`
    );
    const { lat, lon } = data.associated.location;

    const results = await axios.get(
      `http://services.surfline.com/kbyg/mapview/spot?lat=${lat}&lon=${lon}`
    );
    res.status(200).json(results.data);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

module.exports = router;
