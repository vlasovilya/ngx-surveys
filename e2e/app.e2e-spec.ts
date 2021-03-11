import { UISwitchPage } from './app.po';

describe('ngx-surveys App', () => {
  let page: SurveyPage;

  beforeEach(() => {
    page = new SurveyPage();
  });

  it('should display navbar title', () => {
    page.navigateTo();
    expect(page.getNavbarText()).toEqual('ngx surveys');
  });
});
