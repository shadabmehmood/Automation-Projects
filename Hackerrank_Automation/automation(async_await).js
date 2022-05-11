const puppeteer = require('puppeteer');
const codeObj = require('./code');

const loginLink = 'https://www.hackerrank.com/auth/login';
const email = 'kiromag658@eoscast.com';
const password = 'Shadab123@';


(async function(){
    try {
        let browserInstance = await puppeteer.launch({
            headless:false,
            args :["--start-maximized"],
            defaultViewport:null
        })
         let newTab = await  browserInstance.newPage();
         await newTab.goto(loginLink);
         await newTab.type("input[type='text']",email,{delay : 50});
         await newTab.type("input[type='password']",password,{visible: true });
         await newTab.click('button[data-analytics="LoginPassword"]',{visible: true });
         await waitAndClick('.topic-card a[data-attr1="algorithms"]',newTab);
         await  waitAndClick("input[value='warmup']",newTab);
         let allChallenges = await newTab.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled');
         console.log(allChallenges.length);
         await questionSolver(newTab,allChallenges[0],codeObj.answers[0]);


         newTab.keyboard.down('Control');
         newTab.keyboard.press('A');
         newTab.keyboard.press('X');
         newTab.keyboard.up('Control');
         

        await waitAndClick('.monaco-editor.no-user-select.vs',newTab);
         newTab.keyboard.down('Control');
         newTab.keyboard.press('A');
         newTab.keyboard.press('V');
         await waitAndClick('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled',newTab);



    }catch(error){
        console.log(error);
    }
})()


async function waitAndClick(selector,cPage){
    await cPage.waitForSelector(selector);
    let selectorClicked = cPage.click(selector);
    return selectorClicked;
}

async function questionSolver(newTab , question , answer){
    
        await question.click();
        await waitAndClick('.monaco-editor.no-user-select.vs',newTab);
        await waitAndClick('.checkbox-input',newTab);
        await newTab.type('.input.text-area.custominput.auto-width',answer,{delay:20});
    }