import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("./");
  await page.getByRole("button", { name: "로그인" }).click();
  await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
  await page.getByPlaceholder("••••••••").fill("secret123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByText("봄이네님")).toBeVisible();
};

test.describe("§02 shelter inquiry", () => {
  test("opens an inquiry from an animal and exchanges messages", async ({ page }) => {
    await login(page);
    await page.goto("animals/animal-1");

    // Start an inquiry from the sticky apply panel.
    await page.getByRole("button", { name: "보호소에 문의하기" }).click();
    await expect(page.getByRole("heading", { name: "보호소에 문의하기" })).toBeVisible();

    const first = "이 아이는 산책을 좋아하나요? 방문 상담도 가능할까요?";
    await page
      .getByPlaceholder("예: 이 아이는 아이들과 잘 지내나요? 방문 상담도 가능할까요?")
      .fill(first);
    await page.getByRole("button", { name: "문의 보내기" }).click();

    // Lands in the new thread with the first message shown.
    await expect(page).toHaveURL(/\/inquiries\/inquiry-\d+$/);
    await expect(page.getByText(first)).toBeVisible();

    // Post a follow-up; it appears in the thread.
    const reply = "감사합니다. 이번 주말에 방문할게요.";
    await page.getByPlaceholder("메시지를 입력하세요").fill(reply);
    await page.getByRole("button", { name: "보내기" }).click();
    await expect(page.getByText(reply)).toBeVisible();

    await page.screenshot({ path: "e2e-artifacts/inquiry-thread.png", fullPage: true });

    // The inquiry surfaces in 내 문의.
    await page.getByRole("link", { name: "문의 목록으로" }).click();
    await expect(page).toHaveURL(/\/inquiries$/);
    await expect(page.getByRole("heading", { name: "내 문의" })).toBeVisible();
    await expect(page.getByRole("link", { name: /문의/ }).first()).toBeVisible();

    await page.screenshot({ path: "e2e-artifacts/my-inquiries.png", fullPage: true });
  });

  test("reaches 내 문의 from the my-page activity list", async ({ page }) => {
    await login(page);
    await page.goto("my");

    await page.getByRole("link", { name: "내 문의" }).click();
    await expect(page).toHaveURL(/\/inquiries$/);
    await expect(page.getByRole("heading", { name: "내 문의" })).toBeVisible();
  });
});
