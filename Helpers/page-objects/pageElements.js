import BaseElements from "../Elements/baseElements.js";

export class Header {
  constructor(page) {
    this.baseElements = new BaseElements(page);
  }

  get btnHome() {
    return this.baseElements.getElement('nav.header_nav a[routerlink="/"]');
  }

  get btnAbout() {
    return this.baseElements.getElement(
      'nav.header_nav button[appscrollto="aboutSection"]'
    );
  }

  get btnContacts() {
    return this.baseElements.getElement(
      'nav.header_nav button[appscrollto="contactsSection"]'
    );
  }

  get btnGuestLogIn() {
    return this.baseElements.getElement("button.header-link.-guest");
  }

  get btnSignIn() {
    return this.baseElements.getElement("button.header_signin");
  }

  get btnSignUp() {
    return this.baseElements.getElement("button.hero-descriptor_btn");
  }

  get garageProfile() {
    return this.baseElements.getElement("#userNavDropdown");
  }

  get garageDropdownProfile() {
    return this.baseElements.getElement("a[routerlink='/panel/profile']");
  }

  get garagePageTitle() {
    return this.baseElements.getElement("app-garage h1");
  }

  get garagePageMsg() {
    return this.baseElements.getElement(".panel-empty_message");
  }

  get profilePageTitle() {
    return this.baseElements.getElement(".panel-page_heading h1");
  }

  get profilePageUserName() {
    return this.baseElements.getElement(".profile_name");
  }

  get fuelExpenses() {
    return this.baseElements.getElement(
      'nav.header_nav a[routerlink="/panel/expenses"]'
    );
  }
}

export class Footer {
  
  constructor(page) {
    this.baseElements = new BaseElements(page);
  }

  // === Socials ===
  get facebook() {
    return this.baseElements.getElement('a[href*="facebook"]');
  }

  get telegram() {
    return this.baseElements.getElement('a[href*="t.me"]');
  }

  get youtube() {
    return this.baseElements.getElement('a[href*="youtube"]');
  }

  get instagram() {
    return this.baseElements.getElement('a[href*="instagram"]');
  }

  get linkedin() {
    return this.baseElements.getElement('a[href*="linkedin"]');
  }

  // === Contacts ===
  get linkWebsite() {
    return this.baseElements.getElement('a.contacts_link[href*="ithillel.ua"]');
  }

  get linkEmail() {
    return this.baseElements.getElement('a.contacts_link[href^="mailto"]');
  }
}

export const createHeader = (page) => new Header(page);
export const createFooter = (page) => new Footer(page);
