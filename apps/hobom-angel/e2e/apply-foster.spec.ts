import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("./");
  await page.getByRole("button", { name: "로그인" }).click();
  await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
  await page.getByPlaceholder("••••••••").fill("secret123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByText("봄이네님")).toBeVisible();
};

test.describe("§03 foster funnel", () => {
  test("opens from the detail CTA, walks the survey, and submits", async ({ page }) => {
    await login(page);
    await page.goto("animals/animal-1");

    await page.getByRole("button", { name: "임시보호 신청" }).click();
    await expect(page).toHaveURL(/\/foster\/apply\/animal-1/);

    // f1 가능 기간 (single choice, required)
    await page.getByRole("button", { name: "1개월 이내" }).click();
    await page.getByRole("button", { name: "다음" }).click();

    // f2 반려동물 (boolean, required)
    await page.getByRole("button", { name: "아니오" }).click();
    await page.getByRole("button", { name: "다음" }).click();

    // f3 임시보호 경험 (boolean, optional) — skip
    await page.getByRole("button", { name: "다음" }).click();

    // f4 이유 (text, required)
    await page.getByPlaceholder("자유롭게 작성해주세요").fill("따뜻하게 돌봐줄게요.");
    await page.getByRole("button", { name: "다음" }).click();

    // Review → submit
    await expect(page.getByText("입력한 내용을 확인해주세요")).toBeVisible();
    await page.getByRole("button", { name: "신청하기" }).click();

    await expect(page).toHaveURL(/\/animals\/animal-1$/);
  });
});
