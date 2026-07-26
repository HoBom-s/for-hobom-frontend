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
});
