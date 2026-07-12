import { test, expect, type Page } from "@playwright/test";

interface ProfileInput {
  email?: string;
  password?: string;
  nickname?: string;
  realName?: string;
  phone?: string;
}

/** Walk the funnel up to (but not submitting) the final phone step. */
const fillFunnel = async (page: Page, over: ProfileInput = {}) => {
  await page.goto("signup");

  await page.getByText("전체 동의").click();
  await page.getByRole("button", { name: "동의하고 계속" }).click();

  await page.getByPlaceholder("hobom@example.com").fill(over.email ?? "hobom@example.com");
  await page.getByRole("button", { name: "다음" }).click();

  await page.getByPlaceholder("영문·숫자 조합 8자 이상").fill(over.password ?? "hobom1234");
  await page.getByRole("button", { name: "다음" }).click();

  await page.getByPlaceholder("봄이네").fill(over.nickname ?? "봄이네");
  await page.getByRole("button", { name: "다음" }).click();

  await page.getByPlaceholder("김민수").fill(over.realName ?? "김민수");
  await page.getByRole("button", { name: "다음" }).click();

  await page.getByPlaceholder("01012345678").fill(over.phone ?? "01012345678");
};

test.describe("signup funnel", () => {
  test("completes the flow field by field and redirects home", async ({ page }) => {
    await fillFunnel(page);
    await page.getByRole("button", { name: "가입 완료" }).click();

    await expect(page.getByText("가입이 완료됐어요. 환영해요!")).toBeVisible();
    await expect(page).toHaveURL(/\/hobom-angel\/$/);
  });

  test("toasts the server 409 when the nickname is taken", async ({ page }) => {
    await fillFunnel(page, { nickname: "taken" });
    await page.getByRole("button", { name: "가입 완료" }).click();

    await expect(page.getByText("이미 사용 중인 닉네임이에요.")).toBeVisible();
  });

  test("blocks a weak password before advancing", async ({ page }) => {
    await page.goto("signup");
    await page.getByText("전체 동의").click();
    await page.getByRole("button", { name: "동의하고 계속" }).click();

    await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
    await page.getByRole("button", { name: "다음" }).click();

    await page.getByPlaceholder("영문·숫자 조합 8자 이상").fill("password");
    await page.getByRole("button", { name: "다음" }).click();

    await expect(page.getByText("비밀번호는 영문과 숫자를 포함해 8자 이상이어야 해요.")).toBeVisible();
  });
});
