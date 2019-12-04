const {Bot} = require('./bot');



(async ()=>{

    const bot = new Bot()
    const post = await bot.startCrawl()
    console.log('check post', post)
})()