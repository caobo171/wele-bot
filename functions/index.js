const {Bot} = require('./bot');
const functions = require('firebase-functions');

// // Create and Deploy Your


exports.botHandler = functions.database.ref('/bot').onWrite(async(snap, context)=>{
    const bot = new Bot()
    const post = await bot.startCrawl()
    console.log('check post', post)
})