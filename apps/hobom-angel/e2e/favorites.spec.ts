import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("./");
  await page.getByRole("button", { name: "로그인" }).click();
  await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
  await page.getByPlaceholder("••••••••").fill("secret123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByText("봄이네님")).toBeVisible();
};

test.describe("§05·부록 favorites", () => {
  test("lists favorited animals and unfavorites optimistically", async ({ page }) => {
    await login(page);
    await page.goto("./favorites");

    await expect(page.getByRole("heading", { name: "찜", level: 1 })).toBeVisible();
    // Seeded favorites hydrate into cards.
    await expect(page.getByText("콩이", { exact: true })).toBeVisible();
    await expect(page.getByText("초코", { exact: true })).toBeVisible();

    await page.screenshot({ path: "e2e-artifacts/favorites.png", fullPage: true });

    // Unfavoriting drops the card in place (optimistic — no refetch flicker).
    await page.getByRole("button", { name: "초코 찜하기" }).click();
    await expect(page.getByText("초코", { exact: true })).toHaveCount(0);
    await expect(page.getByText("콩이", { exact: true })).toBeVisible();

    // The followed shelters live under the second tab.
    await page.getByRole("tab", { name: "팔로우 보호소" }).click();
    await expect(page.getByText("행복보호소")).toBeVisible();
  });

  test("favorites an animal from the browse grid", async ({ page }) => {
    await login(page);
    await page.getByRole("banner").getByRole("link", { name: "입양" }).click();
    await expect(page).toHaveURL(/\/animals$/);

    // Favorite the first (unfavorited) card, whatever it is.
    const heart = page.locator('button[aria-label$="찜하기"]').first();
    await expect(heart).toHaveAttribute("aria-pressed", "false");
    const name = (await heart.getAttribute("aria-label"))!.replace(" 찜하기", "");
    await heart.click();
    await expect(heart).toHaveAttribute("aria-pressed", "true");

    // Navigate in-app (the mock's favorites live in memory, so a hard reload
    // would reseed them) via the profile menu — it now shows up under 찜.
    await page.getByRole("button", { name: /봄이네님/ }).click();
    await page.getByRole("link", { name: "관심" }).click();
    await expect(page).toHaveURL(/\/favorites$/);
    await expect(page.getByText(name, { exact: true })).toBeVisible();
  });

  test("browses saved reviews and opens one in the modal", async ({ page }) => {
    await login(page);
    await page.goto("./favorites");

    // Bookmarked reviews live under the third tab, reusing the feed tile grid.
    await page.getByRole("tab", { name: "저장한 후기" }).click();
    const tile = page.getByRole("button", { name: "후기 상세 보기" }).first();
    await expect(tile).toBeVisible();

    await tile.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Unbookmarking flips optimistically inside the modal.
    const bookmark = dialog.getByRole("button", { name: "저장" });
    await expect(bookmark).toHaveAttribute("aria-pressed", "true");
    await bookmark.click();
    await expect(bookmark).toHaveAttribute("aria-pressed", "false");
  });
});
