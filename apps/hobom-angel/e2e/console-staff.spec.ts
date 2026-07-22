import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("./");
  await page.getByRole("button", { name: "로그인" }).click();
  await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
  await page.getByPlaceholder("••••••••").fill("secret123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByText("봄이네님")).toBeVisible();
};

test.describe("§7.6 shelter console — staff", () => {
  test("shows the roster and decides promotion requests", async ({ page }) => {
    await login(page);
    await page.goto("console/staff");

    await expect(page.getByRole("heading", { name: "스태프 관리" })).toBeVisible();

    // Roster: representative first, staff with role subtitles, a suspended one.
    await expect(page.getByText(/스태프 4명/)).toBeVisible();
    await expect(page.getByText("봄이네")).toBeVisible();
    await expect(page.getByText("대표", { exact: true })).toBeVisible();
    await expect(page.getByText("정지")).toBeVisible();

    // Pending queue with candidate activity.
    await expect(page.getByText("박자원")).toBeVisible();
    await expect(page.getByText("봉사 20회 · 가입 8개월")).toBeVisible();

    // Approve the first request — it leaves the queue.
    await page.getByRole("button", { name: "승인" }).first().click();
    await expect(page.getByText("스태프로 승인했어요.")).toBeVisible();
    await expect(page.getByText("박자원")).toHaveCount(0);

    // Reject the remaining one via the reason dialog.
    await page.getByRole("button", { name: "반려", exact: true }).first().click();
    await expect(page.getByRole("heading", { name: "승격 요청 반려" })).toBeVisible();
    await page.getByPlaceholder("반려 사유를 입력하세요").fill("봉사 경험을 더 쌓은 뒤 재신청 부탁드려요.");
    await page.getByRole("button", { name: "반려하기" }).click();
    await expect(page.getByText("승격 요청을 반려했어요.")).toBeVisible();
  });

  test("is reachable from the sidebar", async ({ page }) => {
    await login(page);
    await page.goto("console/animals");

    await page.getByRole("link", { name: /스태프 관리/ }).click();

    await expect(page).toHaveURL(/\/console\/staff$/);
    await expect(page.getByRole("heading", { name: "스태프 관리" })).toBeVisible();
  });
});
