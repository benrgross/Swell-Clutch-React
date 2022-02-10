const puppeteer = require("puppeteer");
const router = require("express").Router();

router.get("/getspots/:spot", async (req, res) => {
  console.log(req.params);
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`https://www.surfline.com/search/${req.params.spot}`);

    const text = await page.evaluate(() => {
      return document.querySelector(".SearchResults_result__5syZp").innerText;
    });

    await browser.close();

    res.json(text);
  } catch (err) {
    res.send(err);
  }
});
module.exports = router;
