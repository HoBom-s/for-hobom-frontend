import { test, expect } from "@playwright/test";

test.describe("login", () => {
  test("signs in and lands on the home page", async ({ page }) => {
    await page.goto("login");
    await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
    await page.getByPlaceholder("••••••••").fill("secret123");
    await page.getByRole("button", { name: "로그인" }).click();

    await expect(page).toHaveURL(/\/hobom-angel\/$/);
  });

  test("surfaces the server 401 for wrong credentials", async ({ page }) => {
    await page.goto("login");
    await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
    await page.getByPlaceholder("••••••••").fill("wrongpass");
    await page.getByRole("button", { name: "로그인" }).click();

    await expect(page.getByText("이메일 또는 비밀번호가 올바르지 않아요.")).toBeVisible();
  });

  test("blocks a malformed email before hitting the server", async ({ page }) => {
    await page.goto("login");
    await page.getByPlaceholder("hobom@example.com").fill("hobom@");
    await page.getByPlaceholder("••••••••").fill("secret123");
    await page.getByRole("button", { name: "로그인" }).click();

    await expect(page.getByText("올바른 이메일 형식이 아니에요.")).toBeVisible();
  });
});
