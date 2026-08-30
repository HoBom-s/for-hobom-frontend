import { test, expect } from "@playwright/test";

test.describe("landing", () => {
  test("renders for a guest without requestIdleCallback (Safari)", async ({ page }) => {
    // Simulate Safari < 18.4, where a bare requestIdleCallback reference throws.
    await page.addInitScript(() => {
      // @ts-expect-error — remove the API to reproduce the Safari environment.
      delete window.requestIdleCallback;
      // @ts-expect-error — same.
      delete window.cancelIdleCallback;
    });

    await page.goto("./");

    // The public landing renders (guest) instead of the error boundary.
    await expect(page.getByRole("button", { name: "로그인" })).toBeVisible();
    await expect(page.getByText("일시적인 오류가 발생했어요")).toHaveCount(0);
  });

  test("hero and cta buttons route to the animal list", async ({ page }) => {
    await page.goto("./");
    await page.getByRole("button", { name: "로그인" }).click();
    await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
    await page.getByPlaceholder("••••••••").fill("secret123");
    await page.getByRole("button", { name: "로그인" }).click();
    await expect(page.getByText("봄이네님")).toBeVisible();

    // Back on the landing, the primary CTA follows through to the animal list.
    await page.goto("./");
    await page.getByRole("button", { name: "입양 동물 보기" }).click();
    await expect(page).toHaveURL(/\/animals$/);

    // The closing CTA lands on the same place.
    await page.goto("./");
    await page.getByRole("button", { name: "기다리는 동물 만나기" }).click();
    await expect(page).toHaveURL(/\/animals$/);
  });
});
