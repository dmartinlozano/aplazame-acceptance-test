'use strict';

import CommonComponent from './common-component.js';
import {until} from 'selenium-webdriver';
import yamlConfig from 'node-yaml-config';
const config = yamlConfig.load(__dirname + "./../../config.yml");

export default class Div extends CommonComponent{

  constructor(xpath){
    super(xpath);
  }

  async click(){
    let div = await super.getWebElement();
    return await driver.executeScript(`arguments[0].click();`,div);
  };

  async getText(){
    let div = await super.getWebElement();
    return await driver.executeScript(`return arguments[0].textContent;`,div);
  };

  async getOuterText(){
    let div = await super.getWebElement();
    return await driver.executeScript(`return arguments[0].outerText;`,div);
  };

  async isVisible(){
    let div = driver.findElement(by.xpath(this.xpath));
    await driver.wait(until.elementLocated(by.xpath(this.xpath)),parseInt(config.time.wait_elements),`The div ${this.xpath} is not available`);
    let div2 = driver.findElement(by.xpath(this.xpath));
    return await driver.wait(until.elementIsVisible(div),parseInt(config.time.wait_elements),`The div ${this.xpath} is not visible`);
  };

  async textHasChanged(previousTextInfoButton){
    let _self = this;
    await driver.wait(function(){
      let currentText = _self.getText();
      return currentText !== previousTextInfoButton
    },parseInt(config.time.wait_elements),`The div text hasn't changed`);
  }
}
