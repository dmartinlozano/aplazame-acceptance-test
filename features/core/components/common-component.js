'use strict';

import {until} from 'selenium-webdriver';
import yamlConfig from 'node-yaml-config';
const config = yamlConfig.load(__dirname + "./../../config.yml");

export default class CommonComponent{

  xpath = null;

  constructor(xpath){
    this.xpath = xpath;
  }

  async getWebElement(){
    let component = await driver.findElement(by.xpath(this.xpath));
    await driver.wait(until.elementLocated(by.xpath(this.xpath)),parseInt(config.time.wait_elements),`The component ${this.xpath} is not available`);
    await driver.wait(until.elementIsVisible(component),parseInt(config.time.wait_elements),`The component ${this.xpath} is not visible`);
    return component;
  };

}
