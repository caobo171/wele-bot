// const functions = require('firebase-functions');


const puppeteer = require('puppeteer');






(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.facebook.com/groups/WELEVN/', { waitUntil: 'domcontentloaded' });

    await page.type('#email', 'username@gmail.com');
    // Nhập password vào ô đăng nhập
    await page.type('#pass', 'password#');

    await page.click('#loginbutton')

    try{
        await page.waitForNavigation({
            waitUntil:'domcontentloaded'
        });
    }catch(e){

    }


    await page.goto('https://www.facebook.com/groups/WELEVN',{waitUntil:'domcontentloaded'})
    // await page.click(`a[title='Discussion']`)
    await page.click(`a[title=Discussion]"`)

    // await page.waitForNavigation({
    //     waitUntil:'domcontentloaded'
    // });

    const post = await page.evaluate(() => {
        let have = false
        const postElements = [...document.getElementsByClassName('userContentWrapper')]

        console.log('check postElements', postElements)
        return document.body.innerText
        // postElements.forEach(postElement => {

        //     try {
        //         const authorName = postElement.getElementsByClassName('profileLink')[0].innerText

        //         const date = new Date(document.getElementsByClassName('userContentWrapper')[0].querySelector("[data-testid='story-subtitle']").children[2].querySelector("[title]").title)

        //         let postMessage = ''
        //         const postChildren = document.getElementsByClassName('text_exposed_root')[0].children

        //         for (let i = 0; i < postChildren.length - 2; i++) {
        //             postMessage += postChildren[i].innerText + '\n';
        //         }

        //         const a = postChildren[postChildren.length - 2].innerText
        //         const b = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g

        //         const downloadLinks = [...a.matchAll(b)].map(e => e[0])

        //         const image = postElement.querySelector("a[rel='theater']").getElementsByTagName('img')[0].src

        //         console.log('check a', image)
        //         return {
        //             authorName,
        //             date,
        //             postMessage,
        //             downloadLinks,
        //             image
        //         }
        //     } catch (e) {
        //         console.log(e)
        //     }
        })

    await console.log('check post ', post)


    //   await browser.close();
})();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
