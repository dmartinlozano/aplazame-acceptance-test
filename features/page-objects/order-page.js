'use strict';

import Page from '../core/components/page';
import Button from '../core/components/button';
import Label from '../core/components/label';
import Div from '../core/components/div';
import Input from '../core/components/input';
import IFrame from '../core/components/iframe';
import Modal from '../core/components/modal';
import Span from '../core/components/span';
import CreditCardList from '../core/components/credit-card-list';

import {until} from 'selenium-webdriver';

import yamlConfig from 'node-yaml-config';
const config = yamlConfig.load(__dirname + "./../config.yml");

export default class OrderPage extends Page{

  constructor(){
    super(config.orderPage.url);
    this.parentIframe = new IFrame(config.orderPage.parentIframeXpath);
    this.modal = new Modal(config.orderPage.modalXpath);
    this.instalmentButton = new Button(config.orderPage.instalmentButtonXpath);
    this.conditionsInstalmentsModal = {};
    this.conditionsInstalmentsModal.modal = new Modal(config.orderPage.conditionsInstalmentsModal.xpath);
    this.conditionsInstalmentsModal.fourMonthsSpan = new Span(config.orderPage.conditionsInstalmentsModal.fourMonthsSpanXpath);
    this.payDayButton = new Button(config.orderPage.payDayButtonXpath);
    this.totalSpan = new Span(config.orderPage.totalSpanXpath);
    this.payDayModal = {};
    this.payDayModal.modal = new Modal(config.orderPage.payDayModal.xpath);
    this.payDayModal.day18Div = new Div(config.orderPage.payDayModal.day18DivXpath);
    this.continueButton = new Button(config.orderPage.continueButtonXpath);
    this.backHomeButton = new Button(config.orderPage.backHomeButtonXpath);
    this.personalInfo = {};
    this.personalInfo.nifInput = new Input(config.orderPage.personalInfo.nifInputXpath);
    this.personalInfo.mobileInput = new Input(config.orderPage.personalInfo.mobileInputXpath);
    this.personalInfo.birthdateInput = new Input(config.orderPage.personalInfo.birthdateInputXpath);
    this.personalInfo.addressInput = new Input(config.orderPage.personalInfo.addressInputXpath);
    this.personalInfo.floorInput = new Input(config.orderPage.personalInfo.floorInputXpath);
    this.personalInfo.iReadPrivacyPolicyInput = new Label(config.orderPage.personalInfo.iReadPrivacyPolicyInputXpath);
    this.personalInfo.creditCardList = new CreditCardList(config.orderPage.personalInfo.creditCardListXpath);
    this.smsInput = new Input(config.orderPage.smsInputXpath);
    this.smsSandBoxSpan = new Span(config.orderPage.smsSandBoxSpanXpath);
    this.resultPaymentModal = {};
    this.resultPaymentModal.modal = new Modal(config.orderPage.resultPaymentModal.xpath);
    this.resultPaymentModal.titleLabel = new Label(config.orderPage.resultPaymentModal.titleLabelXpath);
    this.resultPaymentModal.textDiv = new Div(config.orderPage.resultPaymentModal.textDivXpath);
  }
}
