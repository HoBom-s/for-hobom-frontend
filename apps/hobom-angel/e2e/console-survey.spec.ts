import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("./");
  await page.getByRole("button", { name: "로그인" }).click();
  await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
  await page.getByPlaceholder("••••••••").fill("secret123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByText("봄이네님")).toBeVisible();
};

test.describe("§7.5 shelter console — survey builder", () => {
  test("adds a field, saves, and switches purpose", async ({ page }) => {
    await login(page);
    await page.goto("console/survey");

    await expect(page.getByRole("heading", { name: "설문 빌더" })).toBeVisible();
    // Seeded adoption survey loads (list + preview both render the prompt).
    await expect(page.getByText("주거 형태를 알려주세요.").first()).toBeVisible();

    // Nothing to save until the draft changes.
    await expect(page.getByRole("button", { name: "저장" })).toBeDisabled();

    // Add a short-text field and name it via the editor.
    await page.getByRole("button", { name: "단답 필드 추가" }).click();
    await page.getByPlaceholder("질문 내용을 입력하세요").fill("반려 경험이 있나요?");
    await expect(page.getByText("반려 경험이 있나요?").first()).toBeVisible();

    // Save the new version.
    await page.getByRole("button", { name: "저장" }).click();
    await expect(page.getByText("설문을 저장했어요.")).toBeVisible();

    // Switch to the foster survey.
    await page.getByRole("button", { name: "임시보호 설문" }).click();
    await expect(page.getByText("임시보호 가능 기간을 알려주세요.").first()).toBeVisible();
  });
});
