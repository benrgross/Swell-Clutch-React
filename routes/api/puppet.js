const puppeteer = require("puppeteer");
const router = require("express").Router();
const cheerio = require("cheerio");
const chrome = require("chrome-aws-lambda");
require("dotenv").config;

router.get("/getspots/:spot", async (req, res) => {
  console.log(req.params);

  try {
    let results = [];
    const browser = await puppeteer.launch(
      process.env.NODE_ENV === "production"
        ? {
            args: chrome.args,
            executablePath: await chrome.executablePath,
            headless: chrome.headless,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
          }
        : {}
    );

    const page = await browser.newPage();
    await page.goto(`https://www.surfline.com/search/${req.params.spot}`);

    const html = await page.content(); // serialized HTML of page DOM.

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
    res.status(200).json(html);

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
