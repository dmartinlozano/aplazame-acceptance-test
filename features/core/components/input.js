'use strict';

import CommonComponent from './common-component.js';
import {until} from 'selenium-webdriver';
import yamlConfig from 'node-yaml-config';
const config = yamlConfig.load(__dirname + "./../../config.yml");

export default class Input extends CommonComponent{

  constructor(xpath){
    super(xpath);
  }

  async getText(){
    let input = await super.getWebElement();
    return await driver.executeScript(`return arguments[0].value;`,input);
  };

  async setText(text){
    let input = await super.getWebElement();
    return await driver.executeScript(`arguments[0].value="${text}";`,input);
  };

  //i.e.: to put sms. How condition, input must be visible
  async sendKeys(text){
    let input = await super.getWebElement();
    return await input.sendKeys(text);
  };

  async click(){
    let input = await super.getWebElement();
    console.log(await input.getAttribute("outerHTML"));
    return await driver.executeScript(`arguments[0].click();`,input);
  };

  async isVisible(){
    await driver.wait(until.elementLocated(by.xpath(this.xpath)),parseInt(config.time.wait_elements),`The input ${this.xpath} is not available`);
    let input = driver.findElement(by.xpath(this.xpath));
    return await driver.wait(until.elementIsVisible(input),parseInt(config.time.wait_elements),`The input ${this.xpath} is not visible`);
  };
}
