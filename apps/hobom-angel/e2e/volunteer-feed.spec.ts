import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("./");
  await page.getByRole("button", { name: "로그인" }).click();
  await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
  await page.getByPlaceholder("••••••••").fill("secret123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByText("봄이네님")).toBeVisible();
};

test.describe("§05 봉사 후기 피드", () => {
  test("browses the grid and writes a review", async ({ page }) => {
    await login(page);
    await page.goto("./volunteer");
    await page.getByRole("tab", { name: "봉사 후기" }).click();

    // The feed is a grid of review tiles.
    await expect(page.getByRole("button", { name: "후기 상세 보기" }).first()).toBeVisible();

    await page.screenshot({ path: "e2e-artifacts/feed.png", fullPage: true });

    // Writing opens its own page, tagged to one of my signed-up activities.
    await page.getByRole("button", { name: "후기 쓰기" }).click();
    await expect(page).toHaveURL(/\/volunteer\/posts\/new$/);
    await page.getByRole("button", { name: "미국행 이동봉사 동행" }).click();
    await page.getByPlaceholder("봉사 경험을 자유롭게 들려주세요.").fill("첫 봉사 정말 뿌듯했어요!");
    await page.getByRole("button", { name: "등록" }).click();

    // Back on the reviews tab; the new (image-less) post shows as a text tile.
    await expect(page).toHaveURL(/\/volunteer\?tab=reviews$/);
    await expect(page.getByText("후기를 등록했어요.")).toBeVisible();
    await expect(page.getByText("첫 봉사 정말 뿌듯했어요!")).toBeVisible();
  });

  test("opens a tile, likes, and comments in the modal", async ({ page }) => {
    await login(page);
    await page.goto("./volunteer?tab=reviews");

    await page.getByRole("button", { name: "후기 상세 보기" }).first().click();

    const dialog = page.getByRole("dialog");
    await expect(dialog.getByText("저도 다음 주에 참여해요", { exact: false })).toBeVisible();

    // Liking flips optimistically.
    const like = dialog.getByRole("button", { name: "좋아요" });
    await expect(like).toHaveAttribute("aria-pressed", "false");
    await like.click();
    await expect(like).toHaveAttribute("aria-pressed", "true");

    // Adding a comment shows it in the thread.
    await dialog.getByPlaceholder("댓글 달기…").fill("좋은 후기 감사합니다!");
    await dialog.getByRole("button", { name: "등록" }).click();
    await expect(dialog.getByText("좋은 후기 감사합니다!")).toBeVisible();
  });
});
