'use strict';

import { Given, When, Then }  from 'cucumber';
import {Key} from 'selenium-webdriver';
import {expect} from 'chai';
import OrderPage from '../page-objects/order-page';
let orderPage = new OrderPage();

import yamlConfig from 'node-yaml-config';
const config = yamlConfig.load(__dirname + "./../config.yml");


Given('I put {string} in nif input', async function (nif) {
  await orderPage.scrollInto(await orderPage.personalInfo.nifInput.getWebElement());
  return await orderPage.personalInfo.nifInput.setText(nif);
});

Given('I put {string} in mobile input', async function (mobile) {
  return await orderPage.personalInfo.mobileInput.setText(mobile);
});

Given('I put {string} in birthdate input', async function (birthdate) {
  return await orderPage.personalInfo.birthdateInput.setText(birthdate);
});

Given('I put {string} in address input', async function (address) {
  return await orderPage.personalInfo.addressInput.setText(address);
});

Given('I put {string} in floor input', async function (floor) {
  return await orderPage.personalInfo.floorInput.setText(floor);
});

Given('I select I read privacy policy if available', async function () {
    return await orderPage.personalInfo.iReadPrivacyPolicyInput.click();
});

Given('I sould see Continue button wihtout loading data', async function(){
  //wait until button is enabled
  await driver.sleep(500);
  return await driver.wait(async function(){
    let text = await orderPage.continueButton.getText();
    return text !== "Cargando datos";
  },parseInt(config.time.wait_elements),`The continue button is frozen loading data`);
})

Given('I should see a previous credit card with {string}', async function(expectedCreditCard){
    let ccl = await orderPage.personalInfo.creditCardList.findCreditCard(expectedCreditCard);
    expect(ccl).to.not.be.null;
    expect(ccl).to.not.be.undefined;
});

Given('I select {string} credit card', async function(creditCard){
  return await orderPage.personalInfo.creditCardList.selectCreditCard(creditCard);
})

Given('I should see sms code input', async function () {
  return await orderPage.smsInput.isVisible();
});

Given('I put the sms code input equals sandbox label', async function () {
  let sms = await orderPage.smsSandBoxSpan.getText();
  return await orderPage.smsInput.sendKeys(sms);
});

Given('I should see result payment modal', async function(){
  return await orderPage.resultPaymentModal.modal.isVisible();
})

Given('I should see the text {string} in payment modal', async function (expectedText) {
  await orderPage.resultPaymentModal.textDiv.isVisible();
  let text = await orderPage.resultPaymentModal.textDiv.getOuterText();
  expect(text).to.include(expectedText);
});
