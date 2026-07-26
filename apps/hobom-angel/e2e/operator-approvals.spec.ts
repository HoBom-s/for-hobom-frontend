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
  test("processes a report and switches tabs", async ({ page }) => {
    await login(page);

    // Reachable from 마이페이지 for an operator.
    await page.goto("my");
    await page.getByRole("link", { name: "승인 큐 (운영자)" }).click();
    await expect(page).toHaveURL(/\/operator\/approvals$/);

    await expect(page.getByRole("heading", { name: "승인 큐" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "신고 3" })).toBeVisible();

    // A seeded report with its target/reason headline.
    await expect(page.getByText("보호소 신고 · 허위 보호소")).toBeVisible();

    // Dismiss it — the queue shrinks.
    await page
      .getByRole("button", { name: "기각" })
      .first()
      .click();
    await expect(page.getByText("신고를 처리했어요.")).toBeVisible();
    await expect(page.getByRole("tab", { name: "신고 2" })).toBeVisible();

    // Other tabs await their backend endpoint.
    await page.getByRole("tab", { name: "보호소 검증" }).click();
    await expect(page.getByText(/대기 목록 엔드포인트/)).toBeVisible();
  });
});
