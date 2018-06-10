'use strict';

import fs from 'fs';
import {setDefaultTimeout, BeforeAll, After, AfterAll, Status} from 'cucumber';
import {Builder, By, until} from 'selenium-webdriver';

import yamlConfig from 'node-yaml-config';
const config = yamlConfig.load(__dirname + "./../config.yml");

const browser = process.env.BROWSER || "chrome";
const reports = "reports";

//default timeout
setDefaultTimeout(parseInt(config.time.timeout_default));

//add find a word in string prototype
String.prototype.findWord = function (word) {
  return this.split(' ').some(function(w){return w === word});
};

/**
 * Internal module to manage selenium driver related webBrowser
 * @module Driver
 */
class Driver{

  static buildFirefoxDriver(){
    const firefox = require('selenium-webdriver/firefox');
    let firefoxOptions = new firefox.Options();
    //if (headlessMode === "true") { firefoxOptions.headless(); }
    return new Builder().withCapabilities({
        browserName: 'firefox',
        resizeBrowserWindow: true,
        javascriptEnabled: true,
        acceptSslCerts: true,
        locationContextEnabled: true,
        width: 1920,
        height: 1080
    }).setFirefoxOptions(firefoxOptions).build();
  }
  static buildSafariDriver(){
    return new Builder().withCapabilities({
        browserName: 'safari',
        javascriptEnabled: true,
        acceptSslCerts: true,
        locationContextEnabled: true
    }).build();
  }
  static buildOperaDriver(){
    return new Builder().withCapabilities({
        browserName: 'opera',
        javascriptEnabled: true,
        acceptSslCerts: true,
        locationContextEnabled: true,
        "opera.arguments": "-screenwidth 1920 -screenheight 1080"
    }).build();
  }
  static buildIE10Driver(){
    return new Builder().withCapabilities({
        browserName: 'ie10',
        browser: 'WINDOWS',
        version: '10',
        javascriptEnabled: true,
        acceptSslCerts: true,
        locationContextEnabled: true
    }).build();
  }
  static buildIE8Driver(){
    return new Builder().withCapabilities({
        browserName: 'ie8',
        browser: 'WINDOWS',
        version: '8',
        javascriptEnabled: true,
        acceptSslCerts: true,
        locationContextEnabled: true
    }).build();
  }
  static buildEdgeDriver(){
    return new Builder().withCapabilities({
        browserName: 'edge',
        javascriptEnabled: true,
        acceptSslCerts: true,
        locationContextEnabled: true
    }).build();
  }
  static buildChromeDriver(){
    return new Builder().withCapabilities({
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        locationContextEnabled: true,
        chromeOptions : {
          args : ['no-sandbox', '--window-size=1920,1080']
        }
    }).build();
  }

  static buildDriver(){
    switch(browser) {
      case 'firefox': return Driver.buildFirefoxDriver();
      case 'safari': return Driver.buildSafariDriver();
      case 'opera': return Driver.buildOperaDriver();
      case 'ie10': return Driver.buildIE10Driver();
      case 'ie8': return Driver.buildIE8Driver();
      case 'edge': return Driver.buildEdgeDriver();
      case 'chrome': return Driver.buildChromeDriver();
      default: return Driver.buildChromeDriver();
    }
  }
}


BeforeAll(function(){

  console.log('\x1b[36m%s\x1b[0m', 'WebBrowser: '+browser);
  global.driver = Driver.buildDriver();
  global.by = require('selenium-webdriver').By;
  if (!fs.existsSync(reports))fs.mkdirSync(reports);
  driver.manage().deleteAllCookies();
});

AfterAll(async function(){
  return await global.driver.quit();
});

After(async function(scenarioResult) {
  let screenShot = await global.driver.takeScreenshot();
  this.attach(new Buffer(screenShot, 'base64'), 'image/png');

  if (scenarioResult.result.status === "failed"){
    this.attach(scenarioResult.result.exception.stack);
  }

  if (scenarioResult.pickle.tags.length > 0){
    if (scenarioResult.pickle.tags[0].name === "@AttachReceiveEmail" && fs.existsSync('./screenshots/EMAIL_REGISTER.html')) {
      this.attach(new Buffer(fs.readFileSync('./screenshots/EMAIL_REGISTER.html'), 'base64'), 'text/html');
    };
    if (scenarioResult.pickle.tags[0].name === "@AttachRememberPasswordEmail" && fs.existsSync('./screenshots/EMAIL_REMEMBER_PASSWORD.html')) {
      this.attach(new Buffer(fs.readFileSync('./screenshots/EMAIL_REMEMBER_PASSWORD.html'), 'base64'), 'text/html');
    };
  };
  return global.driver;
});
