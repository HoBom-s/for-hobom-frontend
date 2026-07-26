import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("./");
  await page.getByRole("button", { name: "로그인" }).click();
  await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
  await page.getByPlaceholder("••••••••").fill("secret123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByText("봄이네님")).toBeVisible();
};

test.describe("§07 shelter console — volunteer", () => {
  test("enters from the profile menu, creates an event, and decides an applicant", async ({
    page,
  }) => {
    await login(page);

    // Staff reach the console from the profile menu, then open 봉사 일정.
    await page.getByRole("button", { name: /봄이네님/ }).click();
    await page.getByRole("link", { name: "보호소 콘솔" }).click();
    await page.getByRole("link", { name: /봉사 일정/ }).click();
    await expect(page).toHaveURL(/\/console\/volunteer$/);

    await expect(page.getByRole("heading", { name: "봉사 일정 관리" })).toBeVisible();
    await expect(page.getByText("주말 산책 봉사")).toBeVisible();

    await page.screenshot({ path: "e2e-artifacts/console.png", fullPage: true });

    // Create a new event.
    await page.getByPlaceholder("유기견 산책 봉사").fill("야간 순찰 봉사");
    await page.getByLabel("날짜").fill("2026-08-15");
    await page.getByRole("button", { name: "일정 게시" }).click();
    await expect(page.getByText("봉사 일정을 게시했어요.")).toBeVisible();
    await expect(page.getByText("야간 순찰 봉사")).toBeVisible();

    // Open a seeded event's applicants and approve a pending one.
    await page
      .getByRole("article")
      .filter({ hasText: "주말 산책 봉사" })
      .getByRole("button", { name: /지원자/ })
      .click();
    await page.getByRole("button", { name: "승인" }).first().click();
    await expect(page.getByText("승인됨")).toHaveCount(2);

    // A clear way back to the consumer service.
    await page.getByRole("link", { name: "서비스로 나가기" }).click();
    await expect(page).toHaveURL(/\/hobom-angel\/$/);
  });
});
