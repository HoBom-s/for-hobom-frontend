import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("./");
  await page.getByRole("button", { name: "로그인" }).click();
  await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
  await page.getByPlaceholder("••••••••").fill("secret123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByText("봄이네님")).toBeVisible();
};

test.describe("임시보호 알아보기", () => {
  test("is public and hands off to the animal list", async ({ page }) => {
    // Reachable without logging in (the explainer is a public surface).
    await page.goto("foster");
    await expect(page.getByRole("heading", { name: /곁을 내어주세요/ })).toBeVisible();
    await expect(page.getByText("입양과 무엇이 다를까요")).toBeVisible();

    // The CTA sends visitors to the (gated) catalog — a guest hits the login gate.
    await page.getByRole("button", { name: "임보 가능한 친구 보기" }).click();
    await expect(page).toHaveURL(/\/login$/);
  });

  test("the CTA lands a signed-in visitor on the foster-filtered catalog", async ({ page }) => {
    await login(page);

    await page.goto("foster");
    await page.getByRole("button", { name: "임보 가능한 친구 보기" }).click();

    await expect(page).toHaveURL(/\/animals\?placement=FOSTER$/);
    await expect(page.getByRole("button", { name: "임보", exact: true })).toBeVisible();
  });
});
