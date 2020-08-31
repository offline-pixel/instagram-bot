const ig = require('./instagram'),
tags = ["tag1", "tag2", "tag3"]
(async () => {
    await ig.initialize()
    await ig.login("username","password")
    await ig.likeTagsProcess(tags)

    debugger
})()