import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("./");
  await page.getByRole("button", { name: "로그인" }).click();
  await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
  await page.getByPlaceholder("••••••••").fill("secret123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByText("봄이네님")).toBeVisible();
};

test.describe("session — stay signed in", () => {
  test("greets the user after login and persists across a reload", async ({ page }) => {
    await login(page);

    await page.reload();
    await expect(page.getByText("봄이네님")).toBeVisible();
  });

  test("keeps signed-in users out of the login page", async ({ page }) => {
    await login(page);

    // Visiting /login while signed in bounces to home (GuestOnlyRoute).
    await page.goto("login");
    await expect(page).toHaveURL(/\/hobom-angel\/$/);
    await expect(page.getByText("봄이네님")).toBeVisible();
  });
});
