'use strict';

import CommonComponent from './common-component.js';
import {until} from 'selenium-webdriver';
import yamlConfig from 'node-yaml-config';
const config = yamlConfig.load(__dirname + "./../../config.yml");

export default class Span extends CommonComponent{

  constructor(xpath){
    super(xpath);
  }

  async getText(){
    let span = await super.getWebElement();
    return await driver.executeScript(`return arguments[0].textContent;`,span);
  };

  async click(){
    let span = await super.getWebElement();
    return await driver.executeScript(`arguments[0].click();`,span);
  };

  async isVisible(){
    await driver.wait(until.elementLocated(by.xpath(this.xpath)),parseInt(config.time.wait_elements),`The span ${this.xpath} is not available`);
    let span = driver.findElement(by.xpath(this.xpath));
    return await driver.wait(until.elementIsVisible(span),parseInt(config.time.wait_elements),`The span ${this.xpath} is not visible`);
  };
}
