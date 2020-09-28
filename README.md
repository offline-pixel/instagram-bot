# Instagram Bot
This is about instagram-bots which automate the clicking of hashtags provided in an array list with puppeteer library

###### Note:
1. Instagram constantly make changes to the app, so this script might not work at some point. If you will face an issues, just raise it in issue section with the all steps taken and where you came across tha particular issue with screenshot(optional).
2. It is one of my older experiment from the year 2019. After, I made this repo public, i forgot to remove my own username and password. Now i just overwritten the master branch before deleting the original master branch. If you are stuck somewhere like me, must try this solution [stackoverflow](https://stackoverflow.com/questions/13716658/how-to-delete-all-commit-history-in-github)

### Prerequisite 
1. You must have installed node.js latest version. Otherwise, Go to [node.js](https://nodejs.org/en/)
2. You know how to run puppeteer in the editor

### Steps
1. Go to root folder
2. Run `npm install`,
3. Create a file with path `config/config.env`,
4. Add following text `USERPROFILE=insta-profile-name-here` && `PASSWORD=password-here` and save the file,
5. To Edit/Add tags, Go to tag folder... open any file and replace those tags name or create new files as per your convenience(also check imports on top of file: `index.js`)
5. Launch puppeteer :)