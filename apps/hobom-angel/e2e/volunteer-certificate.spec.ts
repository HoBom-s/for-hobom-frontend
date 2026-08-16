import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("./");
  await page.getByRole("button", { name: "로그인" }).click();
  await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
  await page.getByPlaceholder("••••••••").fill("secret123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByText("봄이네님")).toBeVisible();
};

test.describe("§05 봉사 확인서", () => {
  test("reachable from 마이페이지, lists certificates and issues a new one", async ({ page }) => {
    await login(page);

    // Reachable from the 내 활동 section.
    await page.goto("my");
    await page.getByRole("link", { name: "봉사 확인서" }).click();
    await expect(page).toHaveURL(/\/volunteer\/certificates$/);

    // The seeded certificate shows its number, totals, and participations.
    await expect(page.getByRole("heading", { name: "봉사 확인서" })).toBeVisible();
    await expect(page.getByText("HB-2026-000418")).toBeVisible();
    await expect(page.getByText("주말 산책 봉사")).toBeVisible();

    await page.screenshot({ path: "e2e-artifacts/volunteer-certificate.png", fullPage: true });

    // Issue a new one — it appears at the top with a success toast.
    await page.getByRole("button", { name: "확인서 발급" }).click();
    await expect(page.getByText("확인서를 발급했어요.")).toBeVisible();
    await expect(page.getByText("급식소 청소 봉사")).toBeVisible();
  });
});
