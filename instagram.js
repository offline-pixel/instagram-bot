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
        await instagram.page.waitForTimeout(4500)
 
        /* Writing the username and password */
        await instagram.page.type('input[name="username"]', username, { delay: 100 })
        await instagram.page.type('input[name="password"]', password, { delay: 100 })
        await instagram.page.waitForTimeout(2500)
        
        /* Click on the login url button */
        loginButton = await instagram.page.$x('//div[contains(text(), "Log in")]')
        await loginButton[0].click()
        await instagram.page.waitForTimeout(7000)
    },

    likeTagsProcess: async(tags = []) => {
        for ( let tag of tags ) {
            //ssds
            console.log(`tag has been changed to ${tag}`)
            await instagram.page.goto(TAG_URL(tag), { waitUntil: "domcontentloaded" })
            await instagram.page.waitForTimeout(6000)

            let posts = await instagram.page.$$('article > div:nth-child(3) img[crossorigin="anonymous"]')
            await instagram.page.waitForTimeout(2000)
            for ( let i = 0; i < 10; i++ ){
                let post = posts[i]
                /* Click on the post */
                await post.click()
                await instagram.page.waitForTimeout(3000)

                /* Wait for the model to appear */
                await instagram.page.waitForTimeout('div[role="dialog"]')
                await instagram.page.waitForTimeout(3000)

                let isLikable = await instagram.page.$$('article[role="presentation"] svg[aria-label="Like"]')
                // console.log(isLikable)
                // console.log(posts[i])
                
                if (isLikable) {
                    console.log("trying to like the photo of tag "+ tag)
                    // await post.click('span[class="fr66n"]')
                    await isLikable[1].click()
                }

                await instagram.page.waitForTimeout(3000)
                /* close the model */
                let closeModelButton = await instagram.page.$$('svg[aria-label="Close"]')
                // console.log(closeModelButton)
                await closeModelButton[0].click()
                await instagram.page.waitForTimeout(1500)                
            }
            await instagram.page.waitForTimeout(3000)
        }
    }
}
module.exports = instagram