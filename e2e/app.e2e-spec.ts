import { WhateverPage } from './app.po';

describe('whatever App', () => {
  let page: WhateverPage;

  beforeEach(() => {
    page = new WhateverPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
