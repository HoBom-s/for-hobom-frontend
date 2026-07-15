import { test, expect } from "@playwright/test";

test.describe("global footer", () => {
  test("shows on desktop with quick + legal links", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("./");

    const footer = page.getByRole("contentinfo");
    await expect(footer).toBeVisible();
    await expect(footer.getByRole("link", { name: "이용약관" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "입양" })).toBeVisible();
  });

  test("is hidden on mobile (bottom tab carries navigation)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 780 });
    await page.goto("./");

    await expect(page.getByRole("contentinfo")).toBeHidden();
  });
});
