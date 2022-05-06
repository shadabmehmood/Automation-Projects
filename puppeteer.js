const puppeteer = require("puppeteer");
let cPage
let browserOpenpromise = puppeteer.launch({
    headless: false,
    slowMo: true,
    defaultViewport: null,
    args:["--start-maximized"]
}
    );
browserOpenpromise.then(function(browser){
    const pagesArrpromise = browser.pages();
    return pagesArrpromise;
}).then(function(browserPages){
    cPage = browserPages[0];
    let gotoPromise = cPage.goto("https://www.google.com/");
    return gotoPromise;
}).then(function(){
    let elementwaitPromise = cPage.waitForSelector("input[type='text']",{visible: true });
    return elementwaitPromise;
})
.then(function(){
    let keysWillSendPromise = cPage.type("input[type='text']","pepcoding");
    return keysWillSendPromise;
}).then(function(){
    let enterPressed = cPage.keyboard.press("Enter");
    return enterPressed;
}).then(function(){
    let elementWaitPromise = cPage.waitForSelector("h3.LC20lb.MBeuO.DKV0Md",{visible:true});
    return elementWaitPromise;
})
.then(function(){
    let keysWillSendPromise = cPage.click("h3.LC20lb.MBeuO.DKV0Md");
    return keysWillSendPromise;
})