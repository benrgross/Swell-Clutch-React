const puppeteer = require("puppeteer");
const router = require("express").Router();

router.get("/getspots/:spot", async (req, res) => {
  console.log(req.params);

  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
    });
    const page = await browser.newPage();
    await page.goto(`https://www.surfline.com/search/${req.params.spot}`);

    const text = await page.evaluate(() => {
      const name = Array.from(
        document
          .querySelector("#surf-spots")
          .querySelectorAll(".SearchResults_result__5syZp"),
        (element) => element.textContent
      );

      return name;
    });
    console.log("results", text);

    await browser.close();

    res.json(text);
  } catch (err) {
    res.send(err);
  }
});
module.exports = router;

// #surf-spots
// document.querySelector("#surf-spots > div > div:nth-child(2)")
// document.querySelector("#surf-spots > div > div:nth-child(2) > a")
