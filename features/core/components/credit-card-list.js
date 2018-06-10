'use strict';

import CommonComponent from './common-component.js';
import {until} from 'selenium-webdriver';
import yamlConfig from 'node-yaml-config';
const config = yamlConfig.load(__dirname + "./../../config.yml");

export default class CreditCardList extends CommonComponent{

  constructor(xpath){
    super(xpath);
  }

  async findCreditCard(expectedText){
    let ccl = await super.getWebElement();
    let labels = Array.from(await driver.executeScript(`return arguments[0].querySelectorAll(".-choice > .-choice-content");`,ccl));
    let found;
    for (let i=0;i<labels.length;i++){
      let text = await labels[i].getAttribute("textContent");
      if (text.trim()===expectedText){
        found = labels[i];
        break;
      }
    }
    return found;
  }

  async selectCreditCard(expectedText){
    let found = await this.findCreditCard(expectedText);
    if (found){
      let parent = await driver.executeScript("return arguments[0].parentElement;", found);
      let input = await driver.executeScript(`return arguments[0].querySelector("input");`,parent);
      await driver.executeScript(`arguments[0].click();`,input);
    }
  }

}
