import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("./");
  await page.getByRole("button", { name: "로그인" }).click();
  await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
  await page.getByPlaceholder("••••••••").fill("secret123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByText("봄이네님")).toBeVisible();
};

test.describe("§02 animal detail", () => {
  test("opens from a browse card and shows the profile", async ({ page }) => {
    await login(page);
    await page.getByRole("banner").getByRole("link", { name: "입양" }).click();
    await expect(page).toHaveURL(/\/animals$/);

    await page.getByRole("link", { name: /상세 보기/ }).first().click();
    await expect(page).toHaveURL(/\/animals\/animal-\d+$/);

    await expect(page.getByRole("navigation", { name: "위치" })).toBeVisible();
    await expect(page.getByRole("button", { name: "입양 신청하기" })).toBeVisible();
    await expect(page.getByRole("link", { name: /보호소 프로필 보기/ })).toBeVisible();
    await expect(page.getByText("건강 정보")).toBeVisible();
    await expect(page.getByText("구조 이력")).toBeVisible();

    await page.screenshot({ path: "e2e-artifacts/detail.png", fullPage: true });
  });

  test("toggles the favorite", async ({ page }) => {
    await login(page);
    await page.goto("animals/animal-1");

    // animal-1 (콩이) is seeded as a favorite; unfavoriting flips it optimistically.
    const heart = page.getByRole("button", { name: "콩이 찜하기" });
    await expect(heart).toHaveAttribute("aria-pressed", "true");

    await heart.click();

    await expect(heart).toHaveAttribute("aria-pressed", "false");
  });
});
