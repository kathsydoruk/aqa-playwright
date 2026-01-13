export default class BaseElements {
  constructor(page) {
    this.page = page;
  }

  getElement(selector) {
    return this.page.locator(selector);
  }

  getByText(tag, text) {
    return this.page.locator(tag, { hasText: text });
  }

  getWithin(parentSelector, childSelector) {
    return this.page.locator(parentSelector).locator(childSelector);
  }
}
