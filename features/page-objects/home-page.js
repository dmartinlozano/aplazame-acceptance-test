'use strict';

import Page from '../core/components/page';
import Button from '../core/components/button';
import Label from '../core/components/label';
import Div from '../core/components/div';
import Input from '../core/components/input';
import IFrame from '../core/components/iframe';
import Modal from '../core/components/modal';
import Span from '../core/components/span';

import {until} from 'selenium-webdriver';

import yamlConfig from 'node-yaml-config';
const config = yamlConfig.load(__dirname + "./../config.yml");

export default class HomePage extends Page{

  constructor(){
    super(config.homePage.url);
    this.unboxedLabel = new Label(config.homePage.unboxedLabelXpath);
    this.retailLabel = new Label(config.homePage.retailLabelXpath);
    this.setLabel = new Label(config.homePage.setLabelXpath);
    this.priceDiv = new Div(config.homePage.priceDivXpath);
    this.minusButton = new Button(config.homePage.minusButtonXpath);
    this.qtyInput = new Input(config.homePage.qtyInputXpath);
    this.plusButton = new Button(config.homePage.plusButtonXpath);

    this.showInfoIframe = new IFrame(config.homePage.showInfoIframeXpath);
    this.showInfoDiv = new Button(config.homePage.showInfoDivXpath);
    this.payButton = new Button(config.homePage.payButtonXpath);

    this.feePaymentIframe = new IFrame(config.homePage.feePaymentIFrameXpath);
    this.feePaymentModal = {};
    this.feePaymentModal.modal = new Modal(config.homePage.feePaymentModal.xpath);
    this.feePaymentModal.twelveMonthsFeePaymentSpan = new Span(config.homePage.feePaymentModal.twelveMonthsFeePaymentSpanXpath);
    this.feePaymentModal.backButton = new Button(config.homePage.feePaymentModal.backButtonXpath);
  }

}
