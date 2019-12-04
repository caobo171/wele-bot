// const functions = require('firebase-functions');


const puppeteer = require('puppeteer');
const { getLatestEsl } = require('./getLatestEsl');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.facebook.com/groups/WELEVN/', { waitUntil: 'domcontentloaded' });

    await page.type('#email', 'namel.com');
    // Nhập password vào ô đăng nhập
    await page.type('#pass', 'pass#');

    await page.click('#loginbutton')

    try {
        await page.waitForNavigation({
            waitUntil: 'domcontentloaded'
        });
    } catch (e) {

    }

    // await page.click(`a[title='Discussion']`)
    await page.click(`a[title=Discussion]`);
    await page.waitFor(3000)
    await page.click(`a[title=Discussion]`);
    await page.waitFor(10000)

    const post = await getLatestEsl(page)

    console.log('check post', post)
    //   await browser.close();
})();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
