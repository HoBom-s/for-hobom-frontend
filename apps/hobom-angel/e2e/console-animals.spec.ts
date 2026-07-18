import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("./");
  await page.getByRole("button", { name: "로그인" }).click();
  await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
  await page.getByPlaceholder("••••••••").fill("secret123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByText("봄이네님")).toBeVisible();
};

test.describe("§07 shelter console — animals", () => {
  test("registers a new animal and edits one from the roster", async ({ page }) => {
    await login(page);

    await page.getByRole("button", { name: /봄이네님/ }).click();
    await page.getByRole("link", { name: "보호소 콘솔" }).click();
    // The console lands on 동물 관리.
    await expect(page).toHaveURL(/\/console\/animals$/);
    await expect(page.getByRole("heading", { name: "동물 관리" })).toBeVisible();
    await expect(page.getByRole("button", { name: /콩이/ })).toBeVisible();

    await page.screenshot({ path: "e2e-artifacts/console-animals.png", fullPage: true });

    // Register a new animal.
    await page.getByPlaceholder("콩이").fill("다롱이");
    await page.getByLabel("구조일").fill("2026-08-20");
    await page.getByRole("button", { name: "등록하기" }).click();
    await expect(page.getByText("동물을 등록했어요.")).toBeVisible();
    await expect(page.getByRole("button", { name: /다롱이/ })).toBeVisible();

    // Edit an existing animal from the roster.
    await page.getByRole("button", { name: /콩이/ }).first().click();
    await expect(page.getByRole("heading", { name: "콩이 수정" })).toBeVisible();
    await page.getByPlaceholder("콩이").fill("콩순이");
    await page.getByRole("button", { name: "저장하기" }).click();
    await expect(page.getByText("동물 정보를 수정했어요.")).toBeVisible();
    await expect(page.getByRole("button", { name: /콩순이/ })).toBeVisible();
  });
});
