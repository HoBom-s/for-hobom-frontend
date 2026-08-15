import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("./");
  await page.getByRole("button", { name: "로그인" }).click();
  await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
  await page.getByPlaceholder("••••••••").fill("secret123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByText("봄이네님")).toBeVisible();
};

test.describe("§7.2 shelter console — applications", () => {
  test("reviews the adoption queue and reads an application's answers", async ({ page }) => {
    await login(page);
    await page.goto("console/applications");

    await expect(page.getByRole("heading", { name: "신청 처리" })).toBeVisible();

    // Adoption queue (default) resolves the animal name from the roster.
    const row = page.getByRole("button", { name: /콩이/ });
    await expect(row).toBeVisible();
    await row.click();

    // The detail joins the answers to the questionnaire prompts.
    await expect(page.getByText("주거 형태를 알려주세요.")).toBeVisible();
    await expect(page.getByText("아파트", { exact: true })).toBeVisible();

    // Filter to approved only — the pending 콩이 application drops out.
    await page.getByRole("button", { name: "승인", exact: true }).click();
    await expect(page.getByRole("button", { name: /콩이/ })).toHaveCount(0);

    // Switch to the foster queue (status resets to 전체).
    await page.getByRole("button", { name: "임시보호", exact: true }).click();
    await expect(page.getByRole("button", { name: /단추/ })).toBeVisible();
  });

  test("rejects a pending application with a reason", async ({ page }) => {
    await login(page);
    await page.goto("console/applications");

    // Open a pending adoption application — the decision bar shows for PENDING.
    await page.getByRole("button", { name: /콩이/ }).click();
    await page.getByRole("button", { name: "반려하기" }).click();

    // The dialog requires a reason before it can submit.
    await page.getByLabel("반려 사유").fill("보호 환경 확인이 더 필요해요");
    await page
      .getByRole("button", { name: "반려하기" })
      .last()
      .click();

    await expect(page.getByText("신청을 반려했어요.")).toBeVisible();

    // The application now reads as 반려 with the reason, and the bar is gone.
    await expect(page.getByText("보호 환경 확인이 더 필요해요")).toBeVisible();
    await expect(page.getByRole("button", { name: "승인하기" })).toHaveCount(0);
  });
});
