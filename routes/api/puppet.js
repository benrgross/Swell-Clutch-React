const puppeteer = require("puppeteer");
const router = require("express").Router();

router.get("/getspots/:spot", async (req, res) => {
  console.log(req.params);

  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(
      `https://www.surfline.com/search/${req.params.spot}`
      // waitUntil: "networkidle0",
    );

    const text = await page.evaluate(() => {
      // const name = Array.from(
      //   document
      //     .querySelector("#surf-spots")
      //     .querySelectorAll(".SearchResults_result__5syZp"),
      //   (element) => element.textContent
      // );

      return document.querySelector(".Search_headline__rMElG").innerText;
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
