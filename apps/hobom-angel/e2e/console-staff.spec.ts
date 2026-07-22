import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("./");
  await page.getByRole("button", { name: "로그인" }).click();
  await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
  await page.getByPlaceholder("••••••••").fill("secret123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByText("봄이네님")).toBeVisible();
};

test.describe("§7.6 shelter console — staff", () => {
  test("shows the roster and opens a promotion request", async ({ page }) => {
    await login(page);
    await page.goto("console/staff");

    await expect(page.getByRole("heading", { name: "스태프 관리" })).toBeVisible();
    await expect(page.getByText(/스태프 4명/)).toBeVisible();

    // Roster shows the representative and staff with role badges.
    await expect(page.getByText("봄이네")).toBeVisible();
    await expect(page.getByText("대표", { exact: true })).toBeVisible();
    await expect(page.getByText("스태프", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("정지")).toBeVisible();

    // Promotion request is disabled until a member id is entered.
    const submit = page.getByRole("button", { name: "승격 요청" });
    await expect(submit).toBeDisabled();

    await page.getByPlaceholder("회원 ID").fill("user-42");
    await submit.click();
    await expect(page.getByText(/승격 요청을 보냈어요/)).toBeVisible();
  });

  test("is reachable from the sidebar", async ({ page }) => {
    await login(page);
    await page.goto("console/animals");

    await page.getByRole("link", { name: /스태프 관리/ }).click();

    await expect(page).toHaveURL(/\/console\/staff$/);
    await expect(page.getByRole("heading", { name: "스태프 관리" })).toBeVisible();
  });
});
