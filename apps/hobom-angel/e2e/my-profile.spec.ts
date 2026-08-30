import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("./");
  await page.getByRole("button", { name: "로그인" }).click();
  await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
  await page.getByPlaceholder("••••••••").fill("secret123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByText("봄이네님")).toBeVisible();
};

test.describe("마이페이지", () => {
  test("shows the profile and changes the nickname", async ({ page }) => {
    await login(page);
    // Navigate in-app (the mock profile lives in memory, so a hard reload would
    // reset a nickname change) via the profile menu.
    await page.getByRole("button", { name: /봄이네님/ }).click();
    await page.getByRole("link", { name: "마이페이지" }).click();
    await expect(page).toHaveURL(/\/my$/);

    await expect(page.getByRole("heading", { name: "봄이네", level: 2 })).toBeVisible();
    await expect(page.getByText("hobom@example.com")).toBeVisible();
    await expect(page.getByText("이메일 인증 완료")).toBeVisible();

    await page.screenshot({ path: "e2e-artifacts/my.png", fullPage: true });

    await page.getByRole("button", { name: "닉네임 변경" }).click();
    await page.getByPlaceholder("봄이네").fill("봄이네2");
    await page.getByRole("button", { name: "저장" }).click();

    await expect(page.getByText("닉네임을 변경했어요.")).toBeVisible();
    await expect(page.getByRole("heading", { name: "봄이네2", level: 2 })).toBeVisible();
  });

  test("withdraws the account and signs out", async ({ page }) => {
    await login(page);
    await page.goto("./my");

    await page.getByRole("button", { name: "회원 탈퇴" }).click();
    await expect(page.getByText("정말 탈퇴하시겠어요?")).toBeVisible();
    await page.getByRole("button", { name: "탈퇴하기" }).click();

    // Redirected home and signed out.
    await expect(page).toHaveURL(/\/hobom-angel\/$/);
    await expect(page.getByRole("button", { name: "로그인" })).toBeVisible();
  });
});
