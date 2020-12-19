const puppeteer = require("puppeteer");

module.exports = {
scrapeAmazon : async function (url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
  
    const stock = await page.evaluate(() => {
      let inStockText = document.querySelector("#availability > span").innerText;
      return inStockText === "In Stock.";
    });
  
    browser.close();
    return stock;
  }
};