import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("./");
  await page.getByRole("button", { name: "로그인" }).click();
  await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
  await page.getByPlaceholder("••••••••").fill("secret123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByText("봄이네님")).toBeVisible();
};

test.describe("§05 volunteer", () => {
  test("shows the calendar and signs up for an event", async ({ page }) => {
    await login(page);
    await page.getByRole("banner").getByRole("link", { name: "봉사활동" }).click();
    await expect(page).toHaveURL(/\/volunteer$/);

    await expect(page.getByRole("heading", { name: "봉사활동", level: 1 })).toBeVisible();
    // The calendar opens on the earliest event's day, so its card is shown.
    await expect(page.getByText("주말 유기견 산책 봉사")).toBeVisible();
    await expect(page.getByText(/모집 5\/12명/)).toBeVisible();

    await page.screenshot({ path: "e2e-artifacts/volunteer.png", fullPage: true });

    await page.getByRole("button", { name: "봉사 신청하기" }).click();
    await expect(page.getByText("봉사 신청이 접수됐어요.")).toBeVisible();
    await expect(page.getByText(/모집 6\/12명/)).toBeVisible();
  });
});
