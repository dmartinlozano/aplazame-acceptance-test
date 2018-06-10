'use strict';

import {until} from 'selenium-webdriver';
import yamlConfig from 'node-yaml-config';
const config = yamlConfig.load(__dirname + "./../../config.yml");

export default class Page{
  url = null;

  constructor(url){
    this.url = url;
  }

  async open(){
    return await driver.get(this.url);
  };

  async isVisible(){
    return await driver.wait(until.urlContains(this.url),parseInt(config.time.page.wait),`The page is not visible`);
  };

  async scrollInto(webElement){
    return await driver.executeScript(`arguments[0].scrollIntoView(true)`,webElement);
  }

}
