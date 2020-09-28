const puppeteer = require('puppeteer')
const BASE_URL = "https://www.instagram.com/accounts/login/?source=auth_switcher"
const TAG_URL = (tag) => `https://www.instagram.com/explore/tags/${tag}/`

const instagram = {
    browser: null,
    page: null,

    initialize: async () => {
        instagram.browser = await puppeteer.launch({headless:false})
        instagram.page = await instagram.browser.newPage()
    },

    login: async( username, password ) => {
        await instagram.page.goto(BASE_URL, { waitUntil: 'domcontentloaded' })        
        await instagram.page.waitForNavigation({ waitUntil: 'domcontentloaded' })
        await instagram.page.waitFor(5500)
 
        /* Writing the username and password */
        await instagram.page.type('input[name="username"]', username, { delay: 100 })
        await instagram.page.type('input[name="password"]', password, { delay: 100 })
        await instagram.page.waitFor(5500)
        
        /* Click on the login url button */
        loginButton = await instagram.page.$x('//div[contains(text(), "Log In")]')
        await loginButton[0].click()
        await instagram.page.waitFor(7000)
    },

    likeTagsProcess: async(tags = []) => {
        for ( let tag of tags ) {
            //ssds
            await instagram.page.goto(TAG_URL(tag), { waitUntil: "domcontentloaded" })
            await instagram.page.waitFor(7000)
            console.log(tags)
            let posts = await instagram.page.$$('article > div:nth-child(3) img[decoding="auto"]')
            
            for ( let i = 0; i < 3; i++ ){
                let post = posts[i]
                /* Click on the post */
                await post.click()
                await instagram.page.waitFor(8000)

                /* Wait for the model to appear */
                await instagram.page.waitFor('div[role="dialog"]')
                await instagram.page.waitFor(7500)

                let isLikable = await instagram.page.$$('span[class="fr66n"] > button')
                // console.log(isLikableOne)
                // let isLikable = await post.$$('span[clas s="fr66n"]')
                // console.log(isLikable)
                
                if (isLikable) {
                    console.log("trying to like the photo")
                    console.log(isLikable)
                    // await post.click('span[class="fr66n"]')
                    await isLikable[0].click()
                }

                await instagram.page.waitFor(3000)
                /* close the model */
                let closeModelButton = await instagram.page.$$('svg[aria-label="Close"]')
                console.log(closeModelButton)
                await closeModelButton[0].click()
                await instagram.page.waitFor(1500)                
            }
            await instagram.page.waitFor(7000)
        }
    }
}
module.exports = instagram