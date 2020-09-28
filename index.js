let { tags } = require('./tags/top100Cities');
// const { tags } = require('./tags/simple');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env'});

const ig = require('./instagram');

(async () => {
    await ig.initialize()
    await ig.login(process.env.USERPROFILE, process.env.PASSWORD)
    await ig.likeTagsProcess(tags)
    debugger
})()