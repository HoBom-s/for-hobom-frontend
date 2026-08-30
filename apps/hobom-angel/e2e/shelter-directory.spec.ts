import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("./");
  await page.getByRole("button", { name: "로그인" }).click();
  await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
  await page.getByPlaceholder("••••••••").fill("secret123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByText("봄이네님")).toBeVisible();
};

test.describe("§3.5 shelter directory", () => {
  test("lists verified shelters from the nav", async ({ page }) => {
    await login(page);
    await page.getByRole("banner").getByRole("link", { name: "보호소" }).click();
    await expect(page).toHaveURL(/\/shelters$/);

    await expect(page.getByRole("heading", { name: "검증된 보호소", level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: /행복보호소/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /부산해운대보호소/ })).toBeVisible();

    await page.screenshot({ path: "e2e-artifacts/shelters.png", fullPage: true });

    // The operator CTA banner routes to the registration form.
    await page.getByRole("main").getByRole("link", { name: "보호소 등록 신청" }).click();
    await expect(page).toHaveURL(/\/shelters\/register$/);
    await expect(page.getByRole("heading", { name: "보호소 등록 신청" })).toBeVisible();
  });

  test("filters by region via the URL", async ({ page }) => {
    await login(page);
    await page.goto("shelters?region=부산");

    await expect(page.getByRole("link", { name: /부산해운대보호소/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /행복보호소/ })).toHaveCount(0);
  });

  test("switches to the map and opens a shelter from its marker", async ({ page }) => {
    await login(page);
    await page.goto("shelters");

    await page.getByRole("button", { name: "지도" }).click();
    await expect(page).toHaveURL(/view=map/);

    // Markers are drawn on the SVG map, each a routable button.
    const marker = page.getByRole("button", { name: "행복보호소" });
    await expect(marker).toBeVisible();

    await page.screenshot({ path: "e2e-artifacts/shelter-map.png", fullPage: true });

    await marker.click();
    await expect(page).toHaveURL(/\/shelters\/haengbok-shelter$/);
  });
});
