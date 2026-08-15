import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("./");
  await page.getByRole("button", { name: "로그인" }).click();
  await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
  await page.getByPlaceholder("••••••••").fill("secret123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByText("봄이네님")).toBeVisible();
};

test.describe("보호소 등록 신청", () => {
  test("registers a shelter and returns to my page", async ({ page }) => {
    await login(page);
    await page.goto("shelters/register");

    await expect(page.getByRole("heading", { name: "보호소 등록 신청" })).toBeVisible();

    // Submit stays disabled until the required fields are valid.
    const submit = page.getByRole("button", { name: "등록 신청하기" });
    await expect(submit).toBeDisabled();

    await page.getByLabel("보호소 이름").fill("햇살 보호소");
    await page.getByLabel("보호소 프로필 주소").fill("haetsal-shelter");
    await page.getByLabel("시·도").fill("서울");
    await page.getByLabel("시·군·구").fill("마포구");
    await page.getByLabel("도로명 주소").fill("월드컵로 100");

    await page.screenshot({ path: "e2e-artifacts/register-shelter.png", fullPage: true });

    await expect(submit).toBeEnabled();
    await submit.click();

    await expect(page.getByText("등록 신청이 접수됐어요.", { exact: false })).toBeVisible();
    await expect(page).toHaveURL(/\/my$/);
  });

  test("blocks an invalid slug", async ({ page }) => {
    await login(page);
    await page.goto("shelters/register");

    await page.getByLabel("보호소 이름").fill("햇살 보호소");
    await page.getByLabel("보호소 프로필 주소").fill("Bad Slug!");

    await expect(page.getByText("소문자·숫자·하이픈만", { exact: false })).toBeVisible();
    await expect(page.getByRole("button", { name: "등록 신청하기" })).toBeDisabled();
  });
});
