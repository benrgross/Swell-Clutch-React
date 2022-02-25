const puppeteer = require("puppeteer-core");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
  searchSpots: async function (req, res) {
    try {
      let results = [];
      const browser = await puppeteer.launch({
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          '--user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"',
        ],
        waitUntil: "domcontentloaded",
      });
      const page = await browser.newPage();
      await page.setUserAgent(
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
      );
      await page.goto(`https://www.surfline.com/search/${req.params.spot}`);

      const html = await page.content();

      const $ = cheerio.load(html);

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

      await browser.close();

      res.status(200).json(results);
    } catch (err) {
      res.send(err);
      console.log(error);
    }
  },

  getReport: async function (req, res) {
    try {
      const { data } = await axios.get(
        `http://services.surfline.com/kbyg/spots/forecasts/wave?spotId=${req.params.spot}`,
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
  },
};
