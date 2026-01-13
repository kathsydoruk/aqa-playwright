import { test, expect } from "@playwright/test";
import { BasePage } from "../Helpers/page-objects/basePage.js";
import { createHeader } from "../Helpers/page-objects/pageElements.js";
import { createModals } from "../Helpers/page-objects/modalElements.js";

test.describe("Sign Up Form functionality check", () => {
  test.beforeEach(async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.navigate();

    const header = createHeader(page);
    const modals = createModals(page);

    await expect(header.btnSignUp).toBeVisible();
    await header.btnSignUp.click();

    await expect(modals.modalSingUp).toBeVisible();
    await expect(modals.titleModal).toContainText("Registration");
  });

  test("TC1 Shows required errors for all mandatory fields when they are empty", async ({
    page,
  }) => {
    const modals = createModals(page);

    await modals.signUpNameInput.click();
    await modals.signUpNameInput.blur();

    await modals.signUpLastNameInput.click();
    await modals.signUpLastNameInput.blur();

    await modals.signUpEmailInput.click();
    await modals.signUpEmailInput.blur();

    await modals.signUpPasswordInput.click();
    await modals.signUpPasswordInput.blur();

    await modals.signUpRepeatPasswordInput.click();
    await modals.signUpRepeatPasswordInput.blur();

    await expect(modals.getErrorByText("Name required")).toBeVisible();
    await expect(modals.getErrorByText("Name required")).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );
    await expect(modals.signUpNameInput).toHaveClass(/is-invalid/);

    await expect(modals.getErrorByText("Last name required")).toBeVisible();
    await expect(modals.getErrorByText("Last name required")).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );
    await expect(modals.signUpLastNameInput).toHaveClass(/is-invalid/);

    await expect(modals.getErrorByText("Email required")).toBeVisible();
    await expect(modals.getErrorByText("Email required")).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );
    await expect(modals.signUpEmailInput).toHaveClass(/is-invalid/);

    await expect(modals.getErrorByText("Password required")).toBeVisible();
    await expect(modals.getErrorByText("Password required")).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );
    await expect(modals.signUpPasswordInput).toHaveClass(/is-invalid/);

    await expect(
      modals.getErrorByText("Re-enter password required")
    ).toBeVisible();
    await expect(modals.getErrorByText("Re-enter password required")).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );
    await expect(modals.signUpRepeatPasswordInput).toHaveClass(/is-invalid/);

    // Register button is disabled if data incorrect
    await expect(modals.signUpRegisterButton).toBeDisabled();
  });

  test("TC2 Validates Name field length and characters set", async ({
    page,
  }) => {
    const modals = createModals(page);

    // Too short Name
    await modals.signUpNameInput.fill("q");
    await modals.signUpNameInput.blur();
    await expect(
      modals.getErrorByText("Name has to be from 2 to 20 characters long")
    ).toBeVisible();
    await expect(modals.signUpNameInput).toHaveClass(/is-invalid/);

    // Too long Name
    const longName = "qwertyqwertyqwertyqwe";
    await modals.signUpNameInput.fill(longName);
    await modals.signUpNameInput.blur();
    await expect(
      modals.getErrorByText("Name has to be from 2 to 20 characters long")
    ).toBeVisible();

    // Valid Name
    await modals.signUpNameInput.fill("John");
    await modals.signUpNameInput.blur();

    await expect(
      modals.getErrorByText("Name has to be from 2 to 20 characters long")
    ).toHaveCount(0);
    await expect(modals.getErrorByText("Name required")).toHaveCount(0);
    await expect(modals.signUpNameInput).not.toHaveClass(/is-invalid/);
  });

  test("TC3 Validates Last Name field length and characters set", async ({
    page,
  }) => {
    const modals = createModals(page);

    // Too short Last Name
    await modals.signUpLastNameInput.fill("q");
    await modals.signUpLastNameInput.blur();
    await expect(
      modals.getErrorByText("Last name has to be from 2 to 20 characters long")
    ).toBeVisible();

    // Too long Last Name
    const longLastName = "qwertyqwertyqwertyqwe";
    await modals.signUpLastNameInput.fill(longLastName);
    await modals.signUpLastNameInput.blur();
    await expect(
      modals.getErrorByText("Last name has to be from 2 to 20 characters long")
    ).toBeVisible();

    // Valid Last Name
    await modals.signUpLastNameInput.fill("Doe");
    await modals.signUpLastNameInput.blur();

    await expect(
      modals.getErrorByText("Last name has to be from 2 to 20 characters long")
    ).toHaveCount(0);
    await expect(modals.getErrorByText("Last name required")).toHaveCount(0);
    await expect(modals.signUpLastNameInput).not.toHaveClass(/is-invalid/);
  });

  test("TC4 Validates Email format and required rule", async ({ page }) => {
    const modals = createModals(page);

    // Empty email
    await modals.signUpEmailInput.fill("");
    await modals.signUpEmailInput.blur();
    await expect(modals.getErrorByText("Email required")).toBeVisible();
    await expect(modals.signUpEmailInput).toHaveClass(/is-invalid/);

    // Wrong email format
    await modals.signUpEmailInput.fill("wrong-email");
    await modals.signUpEmailInput.blur();
    await expect(modals.getErrorByText("Email is incorrect")).toBeVisible();

    // Correct email
    await modals.signUpEmailInput.fill("valid.email@example.com");
    await modals.signUpEmailInput.blur();

    await expect(modals.getErrorByText("Email required")).toHaveCount(0);
    await expect(modals.getErrorByText("Email is incorrect")).toHaveCount(0);
    await expect(modals.signUpEmailInput).not.toHaveClass(/is-invalid/);
  });

  test("TC5 Validates Password complexity (length, digit, upper and lower case)", async ({
    page,
  }) => {
    const modals = createModals(page);

    const complexityError =
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter";

    // Too short Password
    await modals.signUpPasswordInput.fill("Qwerty1");
    await modals.signUpPasswordInput.blur();
    await expect(modals.getErrorByText(complexityError)).toBeVisible();

    // No digit Password
    await modals.signUpPasswordInput.fill("Qwertyui");
    await modals.signUpPasswordInput.blur();
    await expect(modals.getErrorByText(complexityError)).toBeVisible();

    // No capital letter
    await modals.signUpPasswordInput.fill("qwertyu1");
    await modals.signUpPasswordInput.blur();
    await expect(modals.getErrorByText(complexityError)).toBeVisible();

    // No lowercase letter
    await modals.signUpPasswordInput.fill("QWERTYU1");
    await modals.signUpPasswordInput.blur();
    await expect(modals.getErrorByText(complexityError)).toBeVisible();

    // Valid password
    await modals.signUpPasswordInput.fill("ValidPass1");
    await modals.signUpPasswordInput.blur();

    await expect(modals.getErrorByText("Password required")).toHaveCount(0);
    await expect(modals.getErrorByText(complexityError)).toHaveCount(0);
    await expect(modals.signUpPasswordInput).not.toHaveClass(/is-invalid/);
  });

  test("TC6 Validates that Re-enter password matches Password", async ({
    page,
  }) => {
    const modals = createModals(page);

    // Fill valid password
    await modals.signUpPasswordInput.fill("Password1");
    await modals.signUpPasswordInput.blur();

    // Empty repeat
    await modals.signUpRepeatPasswordInput.fill("");
    await modals.signUpRepeatPasswordInput.blur();
    await expect(
      modals.getErrorByText("Re-enter password required")
    ).toBeVisible();

    // Not matching password
    await modals.signUpRepeatPasswordInput.fill("passworD1");
    await modals.signUpRepeatPasswordInput.blur();
    await expect(modals.getErrorByText("Passwords do not match")).toBeVisible();

    // Matching password
    await modals.signUpRepeatPasswordInput.fill("Password1");
    await modals.signUpRepeatPasswordInput.blur();

    await expect(
      modals.getErrorByText("Re-enter password required")
    ).toHaveCount(0);
    await expect(modals.getErrorByText("Passwords do not match")).toHaveCount(
      0
    );
    await expect(modals.signUpRepeatPasswordInput).not.toHaveClass(
      /is-invalid/
    );
  });

  test("TC7 Enables Register button only when all data is valid and creates a new user", async ({
    page,
  }) => {
    const header = createHeader(page);
    const modals = createModals(page);

    await expect(modals.signUpRegisterButton).toBeDisabled();

    const uniqueEmail = `test+${Date.now()}@test.co`;
    const password = "Password1";

    const signupRequestPromise = page.waitForRequest((req) => {
      return req.method() === "POST" && req.url().includes("/api/auth/signup");
    });

    const signupResponsePromise = page.waitForResponse((res) => {
      return (
        res.request().method() === "POST" &&
        res.url().includes("/api/auth/signup")
      );
    });

    await modals.signUpNameInput.fill("John");
    await modals.signUpLastNameInput.fill("Doe");
    await modals.signUpEmailInput.fill(uniqueEmail);
    await modals.signUpPasswordInput.fill(password);
    await modals.signUpRepeatPasswordInput.fill(password);

    await expect(modals.signUpRegisterButton).toBeEnabled();
    await modals.signUpRegisterButton.click();

    const signupRequest = await signupRequestPromise;
    const requestBodyRaw = signupRequest.postData() ?? "";
    const requestBody =
      requestBodyRaw && requestBodyRaw.trim().startsWith("{")
        ? JSON.parse(requestBodyRaw)
        : null;

    expect(requestBody?.email).toBe(uniqueEmail);

    const signupResponse = await signupResponsePromise;
    expect(signupResponse.status()).toBe(201);

    const responseJson = await signupResponse.json();
    expect(responseJson?.status).toBe("ok");
    expect(responseJson?.data?.userId).toBeTruthy();

    await expect(page).toHaveURL(/\/panel\/garage/);

    await expect(header.garagePageTitle).toContainText("Garage");
    await expect(header.garagePageTitle).toBeVisible();

    await expect(header.garagePageMsg).toContainText(
      "You don’t have any cars in your garage"
    );
    await expect(header.garagePageMsg).toBeVisible();

    await expect(header.garageProfile).toContainText("My profile");
    await expect(header.garageProfile).toBeVisible();

    // Modal should be closed/removed after successful sign up
    await expect(modals.modalSingUp).toHaveCount(0);
  });
});
