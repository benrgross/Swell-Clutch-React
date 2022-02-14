const puppeteer = require("puppeteer");
const router = require("express").Router();
const cheerio = require("cheerio");
const axios = require("axios");

router.get("/getspots/:spot", async (req, res) => {
  console.log(req.body);

  try {
    let results = [];
    const browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
      ],
      waitUntil: "domcontentloaded",
      // waitUntil: "networkidle0",
      // timeout: 0,
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );
    await page.goto(`https://www.surfline.com/search/${req.params.spot}`);

    const html = await page.content(); // serialized HTML of page DOM.
    // const text = await page.evaluate(() => {
    //   // const name = Array.from(
    //   //   document
    //   //     .querySelector("#surf-spots")
    //   //     .querySelectorAll(".SearchResults_result__5syZp"),
    //   //   (element) => element.textContent
    //   // );

    //   return document.querySelector(".Search_headline__rMElG").innerText;
    // });

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
      console.log(spot);
      results.push(spot);
    });

    await browser.close();

    res.status(200).json(results);
  } catch (err) {
    res.send(err);
  }
});

router.post("/report", async (req, res) => {
  console.log(req.body);
  try {
    const browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
      ],
      waitUntil: "domcontentloaded",
      // waitUntil: "networkidle0",
      // timeout: 0,
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );
    await page.goto(req.body.url);

    const html = await page.content();
    const $ = cheerio.load(html);

    const text = page.evaluate(function () {
      const swell = document.querySelector(".quiver-surf-height").textContent;
      return swell;
    });

    res.send(html);
  } catch (error) {
    console.log(error);
  }
});

router.get(`/mapreport`, async (req, res) => {
  console.log(req.method);

  try {
    const { data } = await axios.get(
      `http://services.surfline.com/kbyg/mapview/spot?lat=33.86003711966244&lon=-118.40446791677738`
    );
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;

// #surf-spots
// document.querySelector("#surf-spots > div > div:nth-child(2)")
// document.querySelector("#surf-spots > div > div:nth-child(2) > a")
