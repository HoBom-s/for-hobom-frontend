import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("./");
  await page.getByRole("button", { name: "로그인" }).click();
  await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
  await page.getByPlaceholder("••••••••").fill("secret123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByText("봄이네님")).toBeVisible();
};

test.describe("§04 shelter microsite", () => {
  test("shows the header, verification badge, and the about tab", async ({ page }) => {
    await login(page);
    await page.goto("shelters/haengbok-shelter");

    await expect(page.getByRole("heading", { name: "행복보호소", level: 1 })).toBeVisible();
    await expect(page.getByText("인증 보호소")).toBeVisible();
    await expect(page.getByRole("tab", { name: /동물 \d+/ })).toBeVisible();
    await expect(page.getByText("인사말")).toBeVisible();
    await expect(page.getByText("누적 입양")).toBeVisible();
    await expect(page.getByText("보호 중")).toBeVisible();
    await expect(page.getByText("우리 보호소 아이들")).toBeVisible();
    await expect(page.getByText("방문·후원 안내")).toBeVisible();
    await expect(page.getByRole("link", { name: "봉사 신청하기" })).toBeVisible();

    await page.screenshot({ path: "e2e-artifacts/shelter.png", fullPage: true });
  });

  test("switches tabs and syncs the active tab to the URL", async ({ page }) => {
    await login(page);
    await page.goto("shelters/haengbok-shelter");

    await page.getByRole("tab", { name: /동물 \d+/ }).click();
    await expect(page).toHaveURL(/tab=animals/);
    await expect(page.getByRole("link", { name: /상세 보기/ }).first()).toBeVisible();

    await page.getByRole("tab", { name: "공지·소식" }).click();
    await expect(page).toHaveURL(/tab=notices/);
    await expect(page.getByText("설 연휴 임시보호 봉사자를 찾습니다")).toBeVisible();

    await page.getByRole("tab", { name: "봉사" }).click();
    await expect(page).toHaveURL(/tab=volunteer/);
    await expect(page.getByText("주말 산책 봉사")).toBeVisible();

    await page.getByRole("tab", { name: "FAQ" }).click();
    await expect(page).toHaveURL(/tab=faq/);
    await expect(page.getByText("입양 절차가 어떻게 되나요?")).toBeVisible();
  });

  test("deep-links straight to a tab from the URL", async ({ page }) => {
    await login(page);
    await page.goto("shelters/haengbok-shelter?tab=faq");

    await expect(page.getByRole("tab", { name: "FAQ" })).toHaveAttribute("aria-selected", "true");
    await expect(page.getByText("임시보호도 신청할 수 있나요?")).toBeVisible();
  });
});
