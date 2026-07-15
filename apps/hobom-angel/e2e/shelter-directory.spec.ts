import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("./");
  await page.getByRole("button", { name: "로그인" }).click();
  await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
  await page.getByPlaceholder("••••••••").fill("secret123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByText("봄이네님")).toBeVisible();
};

test.describe("§3.5 shelter directory", () => {
  test("lists verified shelters from the nav", async ({ page }) => {
    await login(page);
    await page.getByRole("banner").getByRole("link", { name: "보호소" }).click();
    await expect(page).toHaveURL(/\/shelters$/);

    await expect(page.getByText("함께하는 보호소")).toBeVisible();
    await expect(page.getByRole("link", { name: /행복보호소/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /부산해운대보호소/ })).toBeVisible();

    await page.screenshot({ path: "e2e-artifacts/shelters.png", fullPage: true });
  });

  test("filters by region via the URL", async ({ page }) => {
    await login(page);
    await page.goto("shelters?region=부산");

    await expect(page.getByRole("link", { name: /부산해운대보호소/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /행복보호소/ })).toHaveCount(0);
  });
});
