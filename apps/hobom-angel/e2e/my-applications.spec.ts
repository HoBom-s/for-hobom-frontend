import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("./");
  await page.getByRole("button", { name: "로그인" }).click();
  await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
  await page.getByPlaceholder("••••••••").fill("secret123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByText("봄이네님")).toBeVisible();
};

test.describe("§05 my applications", () => {
  test("reaches the list from 마이페이지 and shows adoption + foster applications", async ({
    page,
  }) => {
    await login(page);

    await page.goto("my");
    await page.getByRole("link", { name: "내 신청 내역" }).click();

    await expect(page).toHaveURL(/\/applications$/);
    await expect(page.getByRole("heading", { name: "내 신청 내역" })).toBeVisible();

    // Cards hydrate the animal name and overlay a kind · status badge.
    await expect(page.getByText("콩이").first()).toBeVisible();
    await expect(page.getByText(/입양 · 심사 중/).first()).toBeVisible();
    await expect(page.getByText(/임시보호 ·/).first()).toBeVisible();
  });

  test("opens the animal from an application card", async ({ page }) => {
    await login(page);
    await page.goto("applications");

    await page.getByRole("link", { name: /콩이/ }).first().click();
    await expect(page).toHaveURL(/\/animals\/animal-\d+$/);
  });
});
