'use strict';

import CommonComponent from './common-component.js';
import {until} from 'selenium-webdriver';
import yamlConfig from 'node-yaml-config';
const config = yamlConfig.load(__dirname + "./../../config.yml");

export default class Label extends CommonComponent{

  constructor(xpath){
    super(xpath);
  }

  async click(){
    let label = await super.getWebElement();
    return await driver.executeScript(`arguments[0].click();`,label);
  };

  async isSelected(){
    let label = await super.getWebElement();
    let typeLabel = await label.findElement(by.className("type-label"));
    let boderBottomColor = await typeLabel.getCssValue("border-bottom-color");
    let boderLeftColor = await typeLabel.getCssValue("border-left-color");
    let boderRightColor = await typeLabel.getCssValue("border-right-color");
    let boderTopColor = await typeLabel.getCssValue("border-top-color");

    return boderBottomColor === boderLeftColor && boderLeftColor === boderRightColor && boderRightColor === boderTopColor && boderTopColor === config.homePage.labelSelected;
  }

  async getText(){
    let label = await super.getWebElement();
    return await driver.executeScript(`return arguments[0].textContent;`,label);
  };

  async isVisible(){
    await driver.wait(until.elementLocated(by.xpath(this.xpath)),parseInt(config.time.wait_elements),`The label ${this.xpath} is not available`);
    let label = driver.findElement(by.xpath(this.xpath));
    return await driver.wait(until.elementIsVisible(label),parseInt(config.time.wait_elements),`The label ${this.xpath} is not visible`);
  };
}
