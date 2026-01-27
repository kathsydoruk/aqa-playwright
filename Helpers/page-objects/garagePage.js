import { expect } from "@playwright/test";
import BaseElements from "../Elements/baseElements";

export class GaragePage {
  constructor(page) {
    this.page = page;
    this.baseElements = new BaseElements(page);
  }

  // ===== Page =====
  get addCarBtn() {
    return this.baseElements.getByText("button", "Add car");
  }

  // ===== Add car modal =====
  get carBrandSelect() {
    return this.baseElements.getElement("app-add-car-modal select#addCarBrand");
  }

  get carModelSelect() {
    return this.baseElements.getElement("app-add-car-modal select#addCarModel");
  }

  get carMileageInput() {
    return this.baseElements.getElement("app-add-car-modal input#addCarMileage");
  }

  get saveCarBtn() {
    return this.baseElements.getByText("app-add-car-modal button", "Add");
  }

  get cancelCarBtn() {
    return this.baseElements.getByText("app-add-car-modal button", "Cancel");
  }

  // ===== Car card =====
  getCarContainer(carName) {
    return this.page.locator("li.car-item", {
      has: this.page.locator("p.car_name", { hasText: carName }),
    });
  }

  getCarName(carName) {
    return this.getCarContainer(carName).locator("p.car_name");
  }

  getEditCarButton(carName) {
    return this.getCarContainer(carName).locator("button.car_edit");
  }

  getAddExpenseButton(carName) {
    return this.getCarContainer(carName).locator("button.car_add-expense");
  }

  getMileageInput(carName) {
    return this.getCarContainer(carName).locator('input[type="number"]');
  }

  getUpdateMileageButton(carName) {
    return this.getCarContainer(carName).getByText("Update");
  }

  // ===== Remove car modal =====
  get removeCarFromEditBtn() {
    return this.baseElements.getByText(
      "app-edit-car-modal button",
      "Remove car"
    );
  }

  get confirmRemoveCarBtn() {
    return this.baseElements.getElement(
      "app-remove-car-modal button.btn-danger"
    );
  }

  get cancelRemoveCarBtn() {
    return this.baseElements.getByText(
      "app-remove-car-modal button",
      "Cancel"
    );
  }

  // ===== Actions =====
  async addCar(brand, model, mileage) {
    await this.addCarBtn.click();

    await expect(this.carBrandSelect).toBeVisible();

    await this.carBrandSelect.selectOption({ label: brand });
    await this.carModelSelect.selectOption({ label: model });

    await this.carMileageInput.fill(String(mileage));
    await this.saveCarBtn.click();
  }

  async removeCar(carName) {
    await expect(this.getEditCarButton(carName)).toBeVisible();
    await this.getEditCarButton(carName).click();

    await expect(this.removeCarFromEditBtn).toBeVisible();
    await this.removeCarFromEditBtn.click();

    await expect(this.confirmRemoveCarBtn).toBeVisible();
    await this.confirmRemoveCarBtn.click();
  }

  async assertCarVisible(carName) {
    await expect(this.getCarContainer(carName)).toBeVisible();
    await expect(this.getCarName(carName)).toContainText(carName);
  }
}
