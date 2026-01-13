export class BasePage {
  constructor(page) {
    this.page = page;
    this.url = '/';
  }

  async navigate() {
    await this.page.goto(this.url);
  }
}
