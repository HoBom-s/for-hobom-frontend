import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("./");
  await page.getByRole("button", { name: "로그인" }).click();
  await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
  await page.getByPlaceholder("••••••••").fill("secret123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByText("봄이네님")).toBeVisible();
};

test.describe("§09 operator — approval queue", () => {
  test("reviews the pending queue and moderates a report", async ({ page }) => {
    await login(page);

    // Reachable from 마이페이지 for an operator.
    await page.goto("my");
    await page.getByRole("link", { name: "운영자 콘솔" }).click();
    await expect(page).toHaveURL(/\/operator\/approvals$/);

    // The operator console chrome: brand + a way back to the service.
    await expect(page.getByText("운영자 콘솔", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "← 호봄 엔젤로" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "검증 · 신고 관리" })).toBeVisible();

    // Default tab: 보호소 검증 — cards show the shelter name and requester name.
    await expect(page.getByRole("tab", { name: "보호소 검증 2" })).toBeVisible();
    await expect(page.getByText("새봄 유기견 보호소")).toBeVisible();
    await expect(page.getByText("요청자 새봄")).toBeVisible();

    // Open the dossier — the submitted registration and verification signals.
    await page
      .getByRole("button", { name: "심사하기" })
      .first()
      .click();
    await expect(page.getByRole("heading", { name: "보호소 검증 심사" })).toBeVisible();
    await expect(page.getByText("제출 정보")).toBeVisible();
    await expect(page.getByText("자동 검증이 수행되지 않았어요.", { exact: false })).toBeVisible();
    await page.screenshot({ path: "e2e-artifacts/shelter-verification.png", fullPage: true });

    // Approve from the dossier — the queue shrinks and the tab count drops.
    await page.getByRole("button", { name: "승인", exact: true }).click();
    await expect(page.getByText("승인했어요.")).toBeVisible();
    await expect(page.getByRole("tab", { name: "보호소 검증 1" })).toBeVisible();

    // The 신고 tab still moderates reports.
    await page.getByRole("tab", { name: "신고 3" }).click();
    await expect(page.getByText("보호소 신고 · 허위 보호소")).toBeVisible();
    await page
      .getByRole("button", { name: "기각" })
      .first()
      .click();
    await expect(page.getByText("신고를 처리했어요.")).toBeVisible();
    await expect(page.getByRole("tab", { name: "신고 2" })).toBeVisible();
  });
});
