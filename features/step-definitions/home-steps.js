'use strict';

import { Given, When, Then }  from 'cucumber';
import {expect} from 'chai';
import HomePage from '../page-objects/home-page';
let homePage = new HomePage();

import yamlConfig from 'node-yaml-config';
const config = yamlConfig.load(__dirname + "./../config.yml");

Given('I open home page', function () {
  return homePage.open();
});

Then('I should see home page', function(){
  return homePage.isVisible();
});

Given('I see {string} button how selected', async function(selectedButton){
  let isSelected;
  switch (selectedButton){
    case "Retail":
      isSelected = await homePage.retailLabel.isSelected();
      break;
    case "Unboxed":
      isSelected = await homePage.unboxedLabel.isSelected();
      break;
    case "Set":
      isSelected = await homePage.setLabel.isSelected();
      break;
  }
  expect(isSelected).to.be.true;
});

When('I select Unboxed button', async function(){
  return await homePage.unboxedLabel.click();
});

When('I select Retail button', async function(){
  return await homePage.retailLabel.click();
});

When('I select Set button', async function(){
  return await homePage.setLabel.click();
});

Then('The price of the article is {string}', async function(expectedPrice){
  let currentPrice = await homePage.priceDiv.getText();
  expect(expectedPrice).to.equal(currentPrice);
});

Given('The amount of the article is {string}', async function(expectedAmount){
  let qtyInput = await homePage.qtyInput.getText();
  expect(expectedAmount).to.equal(qtyInput);
});

Given('The minium fee is {string}', async function (expectedFee) {
  let text;
  await homePage.showInfoIframe.switchFrame();

  //wait until the button contains the expectedFee and this is attached again
  await driver.wait(async function(){
    await driver.sleep(parseInt(config.time.wait_simulation));
    text = await homePage.showInfoDiv.getText();
    return text.trim().indexOf(expectedFee) !== -1;
  },parseInt(config.time.wait_elements)).catch(function(err){
    console.error(err);
    throw new Error(`The minium fee isn't the expected value: ${expectedFee}`);
  });

  expect(text).to.have.string(expectedFee);
  await homePage.showInfoIframe.switchDefault();
});

When('I select plus button', async function(){
  return await homePage.plusButton.click();
});

When('I select minus button', async function(){
  return await homePage.minusButton.click();
});

When('I put {string} in the amount of the article', async function(amount){
  await homePage.qtyInput.setText(amount);
});

When('I select show info button', async function(){
  await homePage.showInfoIframe.switchFrame();
  await homePage.showInfoDiv.click();
  return homePage.showInfoIframe.switchDefault();
});

When('I should see fee payment modal', async function(){
  await homePage.feePaymentIframe.switchFrame();
  return await homePage.feePaymentModal.modal.isVisible();
});

When('I should see the minium fee {string} in fee payment', async function(expectedFee){
  let text = await homePage.feePaymentModal.twelveMonthsFeePaymentSpan.getText();
  expect(text).to.equal(expectedFee);
});


When('I close fee feePayment modal', async function () {
  return await homePage.feePaymentModal.backButton.click();
});

When("I shouldn't see fee payment modal", async function () {
  await homePage.feePaymentModal.modal.isClose();
  return await homePage.feePaymentIframe.switchDefault();
});

Given("I select payment button", async function(){
  homePage.scrollInto(await homePage.payButton.getWebElement());
  return await homePage.payButton.click();
})
