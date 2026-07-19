import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("./");
  await page.getByRole("button", { name: "로그인" }).click();
  await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
  await page.getByPlaceholder("••••••••").fill("secret123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByText("봄이네님")).toBeVisible();
};

test.describe("§7.4 shelter console — content", () => {
  test("creates, edits, and deletes an announcement", async ({ page }) => {
    await login(page);
    await page.goto("console/content");

    await expect(page.getByRole("heading", { name: "콘텐츠" })).toBeVisible();
    await expect(page.getByText("설 연휴 임시보호 봉사자를 찾습니다")).toBeVisible();

    await page.screenshot({ path: "e2e-artifacts/console-content.png", fullPage: true });

    // Create.
    await page.getByPlaceholder("공지 제목").fill("여름 봉사 모집");
    await page.getByPlaceholder("내용을 입력하세요.").fill("무더위에도 함께해 주실 봉사자를 찾아요.");
    await page.getByRole("button", { name: "게시" }).click();
    await expect(page.getByText("공지를 게시했어요.")).toBeVisible();

    const created = page.getByRole("article").filter({ hasText: "여름 봉사 모집" });
    await expect(created).toBeVisible();

    // Edit.
    await created.getByRole("button", { name: "수정" }).click();
    await expect(page.getByRole("heading", { name: "공지 수정" })).toBeVisible();
    await page.getByPlaceholder("공지 제목").fill("여름 정기 봉사");
    await page.getByRole("button", { name: "저장" }).click();
    await expect(page.getByText("공지를 수정했어요.")).toBeVisible();
    await expect(page.getByRole("article").filter({ hasText: "여름 정기 봉사" })).toBeVisible();

    // Delete.
    await page
      .getByRole("article")
      .filter({ hasText: "여름 정기 봉사" })
      .getByRole("button", { name: "삭제" })
      .click();
    await expect(page.getByText("공지를 삭제했어요.")).toBeVisible();
    await expect(page.getByText("여름 정기 봉사")).toHaveCount(0);
  });
});
