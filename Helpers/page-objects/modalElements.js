import BaseElements from "../Elements/baseElements.js";

export class Modals {
  constructor(page) {
    this.baseElements = new BaseElements(page);
  }

  get modalSingIn() {
    return this.baseElements.getElement("app-signin-modal");
  }

  get modalSingUp() {
    return this.baseElements.getElement("app-signup-modal");
  }

  get titleModal() {
    return this.baseElements.getElement("h4.modal-title");
  }

  get signUpNameInput() {
    return this.baseElements.getElement("input[formcontrolname='name']");
  }

  get signUpLastNameInput() {
    return this.baseElements.getElement("input[formcontrolname='lastName']");
  }

  get signUpEmailInput() {
    return this.baseElements.getElement("input[formcontrolname='email']");
  }

  get signUpPasswordInput() {
    return this.baseElements.getElement("input[formcontrolname='password']");
  }

  get signUpRepeatPasswordInput() {
    return this.baseElements.getElement(
      "input[formcontrolname='repeatPassword']"
    );
  }

  get signUpRegisterButton() {
    return this.baseElements.getElement(
      "app-signup-modal .modal-footer button.btn.btn-primary"
    );
  }

  get signUpCloseButton() {
    return this.baseElements.getElement("app-signup-modal button.close");
  }

  getErrorByText(text) {
    return this.modalSingUp.locator("p").getByText(text, { exact: true });
  }

  get signInEmailInput() {
    return this.baseElements.getElement("input[formcontrolname='email']");
  }

  get signInPasswordInput() {
    return this.baseElements.getElement("input[formcontrolname='password']");
  }

  get signInLoginButton() {
    return this.baseElements.getElement(
      "app-signin-modal button.btn.btn-primary"
    );
  }
}

export const createModals = (page) => new Modals(page);
