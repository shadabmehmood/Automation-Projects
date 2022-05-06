const puppeteer = require('puppeteer');
const codeObj = require('./code');

const loginLink = 'https://www.hackerrank.com/auth/login';
const email = 'kiromag658@eoscast.com';
const password = 'Shadab123@'
let page;

let browserOpen = puppeteer.launch({
    headless:false,
    args :["--start-maximized"],
    defaultViewport:null
})
browserOpen.then(function(browserObj){
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
}).then(function(newTab){
     page = newTab;
    let openLoginPage = page.goto(loginLink);
    return openLoginPage;
}).then(function(){
    let elementwaitPromise =page.waitForSelector("input[type='text']",{visible: true });
    return elementwaitPromise;
}).then(function(){
    let typeEmail = page.type("input[type='text']",email,{delay : 50});
    return typeEmail;
}).then(function(){
    let elementwaitpasswordPromise =page.waitForSelector("input[type='password']",{visible: true });
    return elementwaitpasswordPromise;
}).then(function(){
    let typePassword = page.type("input[type='password']",password,{delay : 50});
    return typePassword;
}).then(function(){
    let elementwaitpasswordPromise =page.waitForSelector('button[data-analytics="LoginPassword"]',{visible: true });
    return elementwaitpasswordPromise;
}).then(function(){
    let loginClicked = page.click('button[data-analytics="LoginPassword"]');
    return loginClicked;
}).then(function(){
    let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]',page);
    return clickOnAlgoPromise;
}).then(function(){
    let clickOnWarmup = waitAndClick("input[value='warmup']",page);
    return clickOnWarmup;
})
//.then(function(){
  //  let clickChallennge = waitAndClick(".ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled",page);
    //return clickChallennge;
//})
.then(function(){
    let questionALL = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled');
    return questionALL;
}).then(function(questionArr){
    let questionWillBeSolved = questionSolver(page,questionArr[0],codeObj.answers[0]);
    return questionWillBeSolved;
}).then(function(){
    console.log("Done");
    let ctrlIsPressed = page.keyboard.down('Control');
    return ctrlIsPressed;
}).then(function(){
    let AisPressed = page.keyboard.press('A');
    return AisPressed;
}).then(function(){
    let XisPressed = page.keyboard.press('X');
    return XisPressed;
}).then(function(){
    let ctrlIsUnPressed = page.keyboard.up('Control');
    return ctrlIsUnPressed;
})
.then(function(){
    let mainEditorisFocus = waitAndClick('.monaco-editor.no-user-select.vs',page);
    return mainEditorisFocus;
}).then(function(){
    let ctrlIsPressed = page.keyboard.down('Control');
    return ctrlIsPressed;
}).then(function(){
    let AisPressed = page.keyboard.press('A');
    return AisPressed;
}).then(function(){
    let VisPressed = page.keyboard.press('V');
    return VisPressed;
}).then(function(){
    let submitClicked = waitAndClick('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled',page);
    return submitClicked;
})







function waitAndClick(selector,cPage){
    return new Promise (function(resolve,reject){
        let waitForModelPromise = cPage.waitForSelector(selector);
        waitForModelPromise.then(function(){
            let clickModel = cPage.click(selector);
            return clickModel;
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}
function questionSolver(page , question , answer){
    return new Promise (function(resolve,reject){
        let questionWillBeSolved = question.click();
         questionWillBeSolved.then(function(){
             let editorInFocus = waitAndClick('.monaco-editor.no-user-select.vs',page);
             return editorInFocus;
         }).then(function(){
             return waitAndClick('.checkbox-input',page);
         }).then(function(){
             return page.waitForSelector('.input.text-area.custominput.auto-width',page);
         }).then(function(){
             return page.type('.input.text-area.custominput.auto-width',answer,{delay:10});

         }).then(function(){
             return resolve();
         })
    })
    }
