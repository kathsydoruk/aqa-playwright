import { test, expect } from "../Helpers/Fixtures/userGaragePage.js";

test("Profile: should display mocked data from GET /api/users/profile", async ({
  userGaragePage,
}) => {
  const { page, header } = userGaragePage;

  const mockedName = "Kateryna";
  const mockedLastName = "Sydoruk";
  const expectedFullName = `${mockedName} ${mockedLastName}`;

  await page.route("**/api/users/profile", async (route) => {
    const response = await route.fetch();
    const json = await response.json();

    if (json && typeof json === "object") {
      const target =
        json.data && typeof json.data === "object" ? json.data : json;
      target.name = mockedName;
      target.lastName = mockedLastName;
    }

    await route.fulfill({
      status: response.status(),
      headers: response.headers(),
      contentType: "application/json",
      body: JSON.stringify(json),
    });
  });

  await header.garageProfile.click();
  await expect(header.garageDropdownProfile).toBeVisible();
  await header.garageDropdownProfile.click();

  await expect(header.profilePageTitle).toHaveText("Profile");

  await expect(header.profilePageUserName).toHaveText(expectedFullName);
});
