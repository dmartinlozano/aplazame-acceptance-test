'use strict';

import CommonComponent from './common-component.js';
import {until} from 'selenium-webdriver';
import yamlConfig from 'node-yaml-config';
const config = yamlConfig.load(__dirname + "./../../config.yml");

export default class IFrame extends CommonComponent{

  constructor(xpath){
    super(xpath);
  }

  async switchFrame(){
    await driver.wait(until.elementLocated(by.xpath(this.xpath)),parseInt(config.time.wait_elements),`The iframe ${this.xpath} is not available`);
    let iFrame = await super.getWebElement();
    return await driver.switchTo().frame(iFrame);
  };

  async switchDefault(){
    return await driver.switchTo().defaultContent();
  };
}
