'use strict';

import {until} from 'selenium-webdriver';
import yamlConfig from 'node-yaml-config';
const config = yamlConfig.load(__dirname + "./../../config.yml");
import {error as wderror} from 'selenium-webdriver';

export default class Modal{

  xpath = null;

  constructor(xpath){
    this.xpath = xpath;
  }

  async isVisible(){
    await driver.wait(until.elementLocated(by.xpath(this.xpath)),parseInt(config.time.wait_elements),`The modal ${this.xpath} is not available`);
    let modal = driver.findElement(by.xpath(this.xpath));
    return await driver.wait(until.elementIsVisible(modal),parseInt(config.time.wait_elements),`The modal ${this.xpath} is not visible`);
  };

  async isClose(){
    let modal = driver.findElement(by.xpath(this.xpath));
    try{
      await driver.wait(until.elementIsNotVisible(modal),parseInt(config.time.wait_elements),`The modal ${this.xpath} is visible`);
    }catch(error){
      if (error instanceof wderror.StaleElementReferenceError) {return;} else{ throw err;}
    }
  }
}
