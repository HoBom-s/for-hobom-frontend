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
  test("shows the event board and signs up for an event", async ({ page }) => {
    await login(page);
    await page.getByRole("banner").getByRole("link", { name: "봉사활동" }).click();
    await expect(page).toHaveURL(/\/volunteer$/);

    await expect(page.getByRole("heading", { name: "함께할 봉사 일정", level: 1 })).toBeVisible();
    // The board opens on the list view, so every upcoming event has its own
    // card — scope the assertions to the one this test signs up for.
    const card = page.getByRole("article").filter({ hasText: "주말 유기견 산책 봉사" });
    await expect(card).toBeVisible();
    await expect(card.getByText(/5 \/ 12명/)).toBeVisible();

    await page.screenshot({ path: "e2e-artifacts/volunteer.png", fullPage: true });

    // Signing up is a commitment, so it goes through a confirmation dialog.
    await card.getByRole("button", { name: "봉사 신청하기" }).click();
    await expect(page.getByText("이 봉사에 신청할까요?")).toBeVisible();
    await page.getByRole("button", { name: "신청하기", exact: true }).click();

    // The button and count re-derive from the refetched, viewer-aware event.
    await expect(page.getByText("봉사 신청이 접수됐어요.")).toBeVisible();
    await expect(card.getByText(/6 \/ 12명/)).toBeVisible();
    await expect(card.getByRole("button", { name: "신청 취소" })).toBeVisible();
    await expect(card.getByText("승인 대기")).toBeVisible();

    // Withdrawing flips everything back — again straight from the cache.
    await card.getByRole("button", { name: "신청 취소" }).click();
    await expect(page.getByText("신청을 취소할까요?")).toBeVisible();
    await page.getByRole("button", { name: "취소하기", exact: true }).click();

    await expect(page.getByText("신청을 취소했어요.")).toBeVisible();
    await expect(card.getByText(/5 \/ 12명/)).toBeVisible();
    await expect(card.getByRole("button", { name: "봉사 신청하기" })).toBeVisible();
  });
});
