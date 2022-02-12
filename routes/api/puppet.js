const puppeteer = require("puppeteer");
const router = require("express").Router();
const cheerio = require("cheerio");

router.get("/getspots/:spot", async (req, res) => {
  console.log(req.params);

  try {
    let results = [];
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-infobars",
        "--window-position=0,0",
        "--ignore-certifcate-errors",
        "--ignore-certifcate-errors-spki-list",
        '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
      ],
      waitUntil: "networkidle0",
      timeout: 0,
    });
    const page = await browser.newPage();
    await page.goto(`https://www.surfline.com/search/${req.params.spot}`);

    const html = await page.content({ encoding: "base64" }); // serialized HTML of page DOM.

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
      results.push(results);
    });
    await browser.close();
    res.status(200).json(results);

    // const text = await page.evaluate(() => {
    //   // const name = Array.from(
    //   //   document
    //   //     .querySelector("#surf-spots")
    //   //     .querySelectorAll(".SearchResults_result__5syZp"),
    //   //   (element) => element.textContent
    //   // );

    //   return document.querySelector(".Search_headline__rMElG").innerText;
    // });
  } catch (err) {
    res.send(err);
  }
});
module.exports = router;

// #surf-spots
// document.querySelector("#surf-spots > div > div:nth-child(2)")
// document.querySelector("#surf-spots > div > div:nth-child(2) > a")
