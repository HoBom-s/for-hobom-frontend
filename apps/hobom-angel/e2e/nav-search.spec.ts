import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("./");
  await page.getByRole("button", { name: "로그인" }).click();
  await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
  await page.getByPlaceholder("••••••••").fill("secret123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByText("봄이네님")).toBeVisible();
};

test.describe("global nav search", () => {
  test("routes to the filtered animal list", async ({ page }) => {
    await login(page);

    const search = page.getByLabel("검색");
    await search.fill("초코");
    await search.press("Enter");

    await expect(page).toHaveURL(/\/animals\?.*q=/);
    // The keyword filter chip and the matching animal are shown.
    await expect(page.getByText('"초코"')).toBeVisible();
    await expect(page.getByText("초코", { exact: true }).first()).toBeVisible();
  });
});
