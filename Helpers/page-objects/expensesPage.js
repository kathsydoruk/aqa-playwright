import { expect } from "@playwright/test";
import BaseElements from "../Elements/baseElements";

export class ExpensesPage {
  constructor(page) {
    this.page = page;
    this.baseElements = new BaseElements(page);
  }

  // ===== Page =====
  get addExpenseBtn() {
    return this.baseElements.getByText("button", "Add an expense");
  }

  // ===== Add expense modal =====
  get vehicleSelect() {
    return this.baseElements.getElement(
      "app-add-expense-modal select#addExpenseCar"
    );
  }

  get reportDateInput() {
    return this.baseElements.getElement(
      "app-add-expense-modal input#addExpenseDate"
    );
  }

  get mileageInput() {
    return this.baseElements.getElement(
      "app-add-expense-modal input#addExpenseMileage"
    );
  }

  get litersInput() {
    return this.baseElements.getElement(
      "app-add-expense-modal input#addExpenseLiters"
    );
  }

  get totalCostInput() {
    return this.baseElements.getElement(
      "app-add-expense-modal input#addExpenseTotalCost"
    );
  }

  get submitExpenseBtn() {
    return this.baseElements.getByText("app-add-expense-modal button", "Add");
  }

  get cancelExpenseBtn() {
    return this.baseElements.getByText(
      "app-add-expense-modal button",
      "Cancel"
    );
  }

  // ===== Expenses list =====
  get carDropdownButton() {
    return this.baseElements.getElement("#carSelectDropdown");
  }

  get carDropdownMenu() {
    return this.baseElements.getElement(
      'ul[aria-labelledby="carSelectDropdown"]'
    );
  }

  get carDropdownItems() {
    return this.baseElements.getElement(
      'ul[aria-labelledby="carSelectDropdown"] li'
    );
  }

  get expensesTable() {
    return this.baseElements.getElement("table.expenses_table");
  }

  get expenseRows() {
    return this.baseElements.getElement("table.expenses_table tbody tr");
  }

  // ===== Actions =====
  async addExpense({ mileage, liters, totalCost }) {
    await expect(this.mileageInput).toBeVisible();

    await this.mileageInput.fill(String(mileage));
    await this.litersInput.fill(String(liters));
    await this.totalCostInput.fill(String(totalCost));

    await this.submitExpenseBtn.click();
  }

  async selectCar(carName) {
    await this.carDropdownButton.click();
    await expect(this.carDropdownMenu).toBeVisible();

    const carItem = this.carDropdownItems
      .filter({ hasText: carName })
      .first();

    await expect(carItem).toBeVisible();
    await carItem.click();

    await expect(this.carDropdownButton).toContainText(carName);
  }

  getExpenseRowByMileage(mileage) {
    return this.expenseRows
      .filter({ hasText: String(mileage) })
      .first();
  }

  async assertExpenseRow({ mileage, liters, totalCost, date }) {
    const row = this.getExpenseRowByMileage(mileage);

    await expect(row).toBeVisible();
    await expect(row).toContainText(String(mileage));
    await expect(row).toContainText(String(liters));
    await expect(row).toContainText(String(totalCost));

    if (date) {
      await expect(row).toContainText(String(date));
    }
  }
}
