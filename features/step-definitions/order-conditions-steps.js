'use strict';

import { Given, When, Then }  from 'cucumber';
import {expect} from 'chai';
import OrderPage from '../page-objects/order-page';
let orderPage = new OrderPage();

import yamlConfig from 'node-yaml-config';
const config = yamlConfig.load(__dirname + "./../config.yml");

Given('I should see order page', async function () {
  await orderPage.isVisible();
  return await orderPage.parentIframe.switchFrame();
});

Then('I should see order modal', async function () {
  return await orderPage.modal.isVisible();
});

Given('I should see {string} instalments', async function (expectedInstalment) {
  let instalment = await orderPage.instalmentButton.getText();
  expect(expectedInstalment).to.equal(instalment);
});

When('I select instalments button', async function () {
  return await orderPage.instalmentButton.click();
});

When('I should see instalments modal', async function () {
  return await orderPage.conditionsInstalmentsModal.modal.isVisible();
});

When('I select {string} instalment', async function (string) {
  return await orderPage.conditionsInstalmentsModal.fourMonthsSpan.click();
});

When("I shouldn't see instalments modal", async function () {
  return await orderPage.conditionsInstalmentsModal.modal.isClose();
});

Given('I should see {string} payDay', async function (expectedPayDay) {
  let payDay = await orderPage.payDayButton.getText();
  expect(expectedPayDay).to.equal(payDay);
});

Then('I should see Total span', async function(){
  await orderPage.totalSpan.isVisible();
})

When('I select payDay payButton', async function () {
  return await orderPage.payDayButton.click();
});

When('I should see payDay modal', async function () {
  return await orderPage.payDayModal.modal.isVisible();
});

When('I select {string} how payDay', async function (expectedPayDay) {
return await orderPage.payDayModal.day18Div.click();
});

When("I shouldn't see payDay modal", async function () {
  return await orderPage.payDayModal.modal.isClose();
});

Given('I select Continue button', async function(){
  return await orderPage.continueButton.click();
});

Then('I should see personal info', async function(){
  return await orderPage.personalInfo.nifInput.isVisible();
});
