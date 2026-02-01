import { test, expect } from "../Helpers/Fixtures/userGaragePage.js";

test.describe("Garage and Fuel Expenses flow", () => {
  const carName = "BMW X6";

  test.afterEach(async ({ userGaragePage }) => {
    const { page, garagePage } = userGaragePage;

    await page.goto(process.env.BASE_URL || "/");

    const car = garagePage.getCarContainer(carName);
    if (await car.count()) {
      await garagePage.removeCar(carName);
    }
  });

  // test("Adds a car and adds fuel expenses to it", async ({
  //   userGaragePage,
  // }) => {
  //   const { page, garagePage, expensesPage } = userGaragePage;

  //   await garagePage.addCar("BMW", "X6", "120000");
  //   await expect(garagePage.getCarName(carName)).toBeVisible();

  //   await garagePage.getAddExpenseButton(carName).click();
  //   await expect(expensesPage.submitExpenseBtn).toBeDisabled();

  //   await expensesPage.addExpense({
  //     mileage: "125000",
  //     liters: "50",
  //     totalCost: "2000",
  //   });

  //   await expect(expensesPage.getExpenseRowByMileage("125000")).toBeVisible();
  //   await expect(page.getByText("50L", { exact: true })).toBeVisible();
  //   await expect(page.getByText("2000.00 USD", { exact: true })).toBeVisible();
  // });

  test("Local Storage test message", async ({ userGaragePage }) => {
    const { page } = userGaragePage;
    const localItem = await page.evaluate(() => {
      localStorage.setItem("testMessage", "Hello from local storage!");
      return localStorage.getItem("testMessage");
    });
    console.log("Local Storage Item:", localItem);
    expect(localItem).toBe("Hello from local storage!");
  });
});
