const puppeteer = require('puppeteer');

/*class Scraper{
    constructor(url, selector, indicatorText){
        this.url = url;
        this.selector = selector;
        this.indicatorText = indicatorText;
    }

    async itemIsInStock() {
        // Set up page with item data.
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.goto(this.url, { waitUntil: 'networkidle2' });

        // Get text that tells us if the item is in stock.
        const stockText = await page.evaluate(() => {
            let text = document.querySelector(this.selector).innerText;
            return text
        })

        browser.close();

        //return stockText === this.indicatorText;
    }
}*/

async function itemIsInStock(url, selectorText, indicatorText) {
    // Set up page with item data.
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    // Get text that tells us if the item is in stock.
    const stockText = await page.evaluate((selectorText) => {
        let text = document.querySelector(selectorText).innerText;
        return text
    })

    browser.close();
    return stockText === indicatorText;
}

let thing = itemIsInStock('https://www.amazon.com/Eloquent-JavaScript-3rd-Introduction-Programming/dp/1593279507/ref=sr_1_1?crid=23QA5EKC86DJ2&dchild=1&keywords=eloquent+javascript&qid=1595163475&sprefix=eloqeu%2Caps%2C156&sr=8-1',
'#availability > span',
'In Stock.');
//console.log(thing);
/*
amazonScraper = new Scraper('https://www.amazon.com/Eloquent-JavaScript-3rd-Introduction-Programming/dp/1593279507/ref=sr_1_1?crid=23QA5EKC86DJ2&dchild=1&keywords=eloquent+javascript&qid=1595163475&sprefix=eloqeu%2Caps%2C156&sr=8-1',
'#availability > span',
'In Stock.');
console.log(amazonScraper.itemIsInStock());
*/