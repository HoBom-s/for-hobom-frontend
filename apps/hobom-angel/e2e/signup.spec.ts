import { test, expect } from "@playwright/test";

const advanceToProfile = async (page: import("@playwright/test").Page) => {
  await page.goto("signup");
  await page.getByText("전체 동의").click();
  await page.getByRole("button", { name: "동의하고 계속" }).click();
  await page.getByRole("button", { name: "본인확인하고 계속" }).click();
};

test.describe("signup funnel", () => {
  test("completes the flow: agreement → 본인확인 → profile → done", async ({ page }) => {
    await advanceToProfile(page);

    await page.getByPlaceholder("봄이네").fill("봄이네");
    await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
    await page.getByRole("button", { name: "가입 완료" }).click();

    await expect(page.getByRole("heading", { name: "가입 완료" })).toBeVisible();
    await expect(page.getByRole("button", { name: "동물 둘러보기" })).toBeVisible();
  });

  test("surfaces the server 409 when the nickname is taken", async ({ page }) => {
    await advanceToProfile(page);

    await page.getByPlaceholder("봄이네").fill("taken");
    await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
    await page.getByRole("button", { name: "가입 완료" }).click();

    await expect(page.getByText("이미 사용 중인 닉네임이에요.")).toBeVisible();
  });

  test("blocks an invalid nickname before hitting the server", async ({ page }) => {
    await advanceToProfile(page);

    await page.getByPlaceholder("봄이네").fill("a");
    await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
    await page.getByRole("button", { name: "가입 완료" }).click();

    await expect(page.getByText(/닉네임은 2~20자/)).toBeVisible();
  });
});
