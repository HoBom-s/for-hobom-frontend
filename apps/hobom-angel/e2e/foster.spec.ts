import { test, expect } from "@playwright/test";

test.describe("임시보호 알아보기", () => {
  test("is public and hands off to the animal list", async ({ page }) => {
    // Reachable without logging in (the explainer is a public surface).
    await page.goto("foster");
    await expect(page.getByRole("heading", { name: /곁을 내어주세요/ })).toBeVisible();
    await expect(page.getByText("입양과 무엇이 다를까요")).toBeVisible();

    // The CTA sends visitors to the (gated) catalog — a guest hits the login gate.
    await page.getByRole("button", { name: "임보 가능한 친구 보기" }).click();
    await expect(page).toHaveURL(/\/login$/);
  });
});
