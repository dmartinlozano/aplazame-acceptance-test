'use strict';

import CommonComponent from './common-component.js';
import {until} from 'selenium-webdriver';
import yamlConfig from 'node-yaml-config';
const config = yamlConfig.load(__dirname + "./../../config.yml");

export default class Button extends CommonComponent{

  constructor(xpath){
    super(xpath);
  }

  async click(){
    let button = await super.getWebElement();
    return await driver.executeScript(`arguments[0].click();`,button);
  };

  async getText(){
    let button = await super.getWebElement();
    return await driver.executeScript(`return arguments[0].textContent;`,button);
  };

  async isVisible(){
    await driver.wait(until.elementLocated(by.xpath(this.xpath)),parseInt(config.time.wait_elements),`The button ${this.xpath} is not available`);
    let button = await super.getWebElement();
    return await driver.wait(until.elementIsVisible(button),parseInt(config.time.wait_elements),`The button ${this.xpath} is not visible`);
  };

  async isEanbled(){
    await driver.wait(until.elementLocated(by.xpath(this.xpath)),parseInt(config.time.wait_elements),`The button ${this.xpath} is not available`);
    let button = await super.getWebElement();
    return await driver.wait(until.elementIsEnabled(button),parseInt(config.time.wait_elements),`The button ${this.xpath} is not enabled`);
  };
}
