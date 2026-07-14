import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("./");
  await page.getByRole("button", { name: "로그인" }).click();
  await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
  await page.getByPlaceholder("••••••••").fill("secret123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByText("봄이네님")).toBeVisible();
};

test.describe("§03 adoption funnel", () => {
  test("walks the survey step by step and submits", async ({ page }) => {
    await login(page);
    await page.goto("animals/animal-1");

    await page.getByRole("button", { name: "입양 신청하기" }).click();
    await expect(page).toHaveURL(/\/apply\/animal-1/);

    // Q1 주거 (single choice, required)
    await page.getByRole("button", { name: "아파트" }).click();
    await page.getByRole("button", { name: "다음" }).click();

    // Q2 반려동물 (boolean, required)
    await page.getByRole("button", { name: "아니오" }).click();
    await page.getByRole("button", { name: "다음" }).click();

    // Q3 가족 구성원 (multi choice, optional) — skip
    await page.getByRole("button", { name: "다음" }).click();

    // Q4 이유 (text, required)
    await page.getByPlaceholder("자유롭게 작성해주세요").fill("좋은 가족이 되고 싶어요.");
    await page.getByRole("button", { name: "다음" }).click();

    // Q5 함께하는 시간 (single choice, required)
    await page.getByRole("button", { name: "6시간 이상" }).click();
    await page.getByRole("button", { name: "다음" }).click();

    // Review → submit
    await expect(page.getByText("입력한 내용을 확인해주세요")).toBeVisible();
    await page.getByRole("button", { name: "신청하기" }).click();

    await expect(page).toHaveURL(/\/animals\/animal-1$/);
  });

  test("blocks advancing past a required question", async ({ page }) => {
    await login(page);
    await page.goto("apply/animal-1");

    // First step is a required single choice; advancing without an answer stays.
    await page.getByRole("button", { name: "다음" }).click();
    await expect(page.getByText("주거 형태를 알려주세요.")).toBeVisible();
  });
});
