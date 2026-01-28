import { test as base, expect } from "@playwright/test";
import dotenv from "dotenv";
import { BasePage } from "../page-objects/basePage.js";
import { createHeader } from "../page-objects/pageElements.js";
import { createModals } from "../page-objects/modalElements.js";
import { GaragePage } from "../page-objects/garagePage.js";
import { ExpensesPage } from "../page-objects/expensesPage.js";

dotenv.config();

export const test = base.extend({
  userGaragePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    const header = createHeader(page);
    const modals = createModals(page);

    const email = process.env.TEST_CREDENTIALS_USERNAME;
    const password = process.env.TEST_CREDENTIALS_PASSWORD;
    
    await basePage.navigate();

    await expect(header.btnSignIn).toBeVisible();
    await header.btnSignIn.click();

    await expect(modals.modalSingIn).toBeVisible();
    await expect(modals.titleModal).toHaveText("Log in");

    await modals.login(email, password);

    await expect(header.garageProfile).toBeVisible();

    // await header.garageProfile.click();
    // await expect(header.garageDropdownProfile).toBeVisible();

    const garagePage = new GaragePage(page);
    const expensesPage = new ExpensesPage(page);

    await use({ page, header, modals, garagePage, expensesPage });
  },
});

export { expect };
