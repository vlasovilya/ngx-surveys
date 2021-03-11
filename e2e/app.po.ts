import { browser, element, by } from 'protractor';

export class SurveyPage {
  navigateTo() {
    return browser.get('/');
  }

  getNavbarText() {
    return element(by.css('.navbar-brand')).getText();
  }
}
