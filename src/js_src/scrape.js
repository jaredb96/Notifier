const puppeteer = require('puppeteer');

async function scrapeAmazon(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const stock = await page.evaluate(() => {
        let inStockText = document.querySelector('#availability > span').innerText;
        return inStockText === 'In Stock.';
    });

    console.log(stock);
    browser.close();
}

scrapeAmazon('https://www.amazon.com/Eloquent-JavaScript-3rd-Introduction-Programming/dp/1593279507/ref=sr_1_1?crid=3KYZ2O8T1XXG9&dchild=1&keywords=eloquent+javascript&qid=1595079015&sprefix=eloquent+ja%2Caps%2C146&sr=8-1');