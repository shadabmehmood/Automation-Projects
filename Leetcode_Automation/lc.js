const puppeteer = require('puppeteer');

const loginLink = 'https://leetcode.com/accounts/login';
const email = 'tirzalurzo@vusra.com';
const password = 'Shadab123@';
let page;
let openChrome = puppeteer.launch({
    headless:false,
    args :["--start-maximized"],
    defaultViewport:null
})
openChrome.then(function(chromeObj){
    let chromeOpen = chromeObj.pages();
    return chromeOpen;
}).then(function(tabsArr){
    page =tabsArr[0];
    const gotoLogin = page.goto(loginLink);
    return gotoLogin;
}).then(function(){
    let emailSelect = waitAndClick('.input__2o8B',page,{visible: true});
    return emailSelect;
}).then(function(){
    let emailTyped = page.type('.input__2o8B',email,{delay : 50});
    return emailTyped;
}).then(function(){
    let passwordSelect = waitAndClick("input[type='password'",page);
    return passwordSelect;
}).then(function(){
    let passwoordEntered = page.type("input[type='password'",password,{delay : 50});
    return passwoordEntered;
}).then(function(){
    let signInClicked = waitAndClick('.btn__3Y3g.fancy-btn__2prB.primary__lqsj.light__3AfA.btn__1z2C.btn-md__M51O',page);
    return signInClicked;
}).then(function(){
    let contestPage = waitAndClick('.btn.btn-default.side-block-btn',page,{visible:true});
    return contestPage;
}).then(function(){
    let dailyChallenge = waitAndClick('span.counter__amcn',page);
    return dailyChallenge;
}).then(function(){
    let editorSelected = waitAndClick('div.CodeMirror-lines',page);
    return editorSelected;
})



function waitAndClick(selector,page){
    return new Promise(function(resolve,reject){
        let waitForSelect = page.waitForSelector(selector);
        waitForSelect.then(function(){
            let clickSelect = page.click(selector);
            return clickSelect;
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    }) 

}