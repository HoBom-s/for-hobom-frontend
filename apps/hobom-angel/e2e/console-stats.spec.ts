import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("./");
  await page.getByRole("button", { name: "로그인" }).click();
  await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
  await page.getByPlaceholder("••••••••").fill("secret123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByText("봄이네님")).toBeVisible();
};

test.describe("§7.7 shelter console — stats", () => {
  test("shows the KPI cards and the adoption trend chart", async ({ page }) => {
    await login(page);
    await page.goto("console/stats");

    await expect(page.getByRole("heading", { name: "통계" })).toBeVisible();

    // KPIs derived from the dashboard payload.
    await expect(page.getByText("이번 달 입양")).toBeVisible();
    await expect(page.getByText("▲ 지난달 +5")).toBeVisible();
    await expect(page.getByText("88%")).toBeVisible();
    await expect(page.getByText("누적 입양 240")).toBeVisible();

    // The trend chart renders with its accessible label.
    await expect(page.getByRole("img", { name: "최근 6개월 월별 입양 추이" })).toBeVisible();
  });

  test("is reachable from the sidebar", async ({ page }) => {
    await login(page);
    await page.goto("console/animals");

    await page.getByRole("link", { name: /통계/ }).click();

    await expect(page).toHaveURL(/\/console\/stats$/);
    await expect(page.getByRole("heading", { name: "통계" })).toBeVisible();
  });
});
