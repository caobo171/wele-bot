const puppeteer = require('puppeteer');
const { getLatestEsl } = require('./getLatestEsl');
const {FACEBOOK_EMAIL, FACEBOOK_PASSWORD} = require('./env')
class Bot {

    constructor(){
        
    }

    async loginFacebook(email, password , page=this.page){
        await page.type('#email', email);
        await page.type('#pass', password);

        await page.click('#loginbutton');
    }

    async wait(duration , page=this.page){
        if(duration){
            await page.waitFor(duration)
        }else{
            try {
                await page.waitForNavigation({
                    waitUntil: 'domcontentloaded'
                });
            } catch (e) {
                console.log(e)
            }
        }
    }


    async turnOffNotificationModal(page=this.page){
        await page.click(`a[title=Discussion]`);
        await page.waitFor(3000)
    }
    async clickToDiscussionPage(page=this.page){
        await page.click(`a[title=Discussion]`);
        await page.waitFor(10000)
    }

    async getLatestEsl(page=this.page){
        return await getLatestEsl(page)
    }

    async goToWELEGroup(page=this.page){
        await page.goto('https://www.facebook.com/groups/WELEVN/?ref=direct', { waitUntil: 'domcontentloaded' });
    }


    async startCrawl (){
        // const browser = await puppeteer.launch({args: ['--no-sandbox']});
        const browser = await puppeteer.launch({headless: false});
        this.page = await browser.newPage();

        await this.goToWELEGroup()
        await this.loginFacebook(FACEBOOK_EMAIL,FACEBOOK_PASSWORD)
        // await this.goToWELEGroup()
        await this.wait()
        await this.turnOffNotificationModal()
        const post = await this.getLatestEsl()

       return post
    }


}

module.exports.Bot = Bot