import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("./");
  await page.getByRole("button", { name: "로그인" }).click();
  await page.getByPlaceholder("hobom@example.com").fill("hobom@example.com");
  await page.getByPlaceholder("••••••••").fill("secret123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByText("봄이네님")).toBeVisible();
};

test.describe("§01 browse animals", () => {
  test("renders the search bar, species filter, and result cards", async ({ page }) => {
    await login(page);
    await page.getByRole("banner").getByRole("link", { name: "입양" }).click();
    await expect(page).toHaveURL(/\/animals$/);

    await expect(page.getByPlaceholder("이름 · 품종 · 지역으로 검색")).toBeVisible();
    await expect(page.getByRole("button", { name: "강아지" })).toBeVisible();
    await expect(page.getByRole("button", { name: "입양가능만" })).toBeVisible();

    // Cards load (mock returns a first page): a result count and status chips.
    await expect(page.getByText(/\d+마리/)).toBeVisible();
    await expect(page.getByText("입양가능", { exact: true }).first()).toBeVisible();

    await page.screenshot({ path: "e2e-artifacts/browse-default.png", fullPage: true });
  });

  test("stays on the animals page after a hard reload", async ({ page }) => {
    await login(page);
    await page.getByRole("banner").getByRole("link", { name: "입양" }).click();
    await expect(page).toHaveURL(/\/animals$/);

    // A reload re-probes the session; the protected route must wait for that
    // probe instead of treating the first frame as a guest (which bounced home).
    await page.reload();

    await expect(page).toHaveURL(/\/animals$/);
    await expect(page.getByPlaceholder("이름 · 품종 · 지역으로 검색")).toBeVisible();
  });

  test("filters by species and reflects it in the URL", async ({ page }) => {
    await login(page);
    await page.getByRole("banner").getByRole("link", { name: "입양" }).click();
    await expect(page).toHaveURL(/\/animals$/);

    await page.getByRole("button", { name: "고양이" }).click();
    await expect(page).toHaveURL(/species=CAT/);

    // The active-filter chips + reset appear once a filter is applied.
    await expect(page.getByText("고양이").last()).toBeVisible();
    await expect(page.getByRole("button", { name: "초기화" })).toBeVisible();
    await page.screenshot({ path: "e2e-artifacts/browse-cat.png", fullPage: true });
  });

  test("sorts by oldest and reflects it in the URL", async ({ page }) => {
    await login(page);
    await page.getByRole("banner").getByRole("link", { name: "입양" }).click();
    await expect(page).toHaveURL(/\/animals$/);

    await page.getByRole("button", { name: "정렬" }).click();
    await page.getByRole("menuitem", { name: "오래된순" }).click();
    await expect(page).toHaveURL(/sort=OLDEST/);
  });

  test("keyword search updates the query string", async ({ page }) => {
    await login(page);
    await page.getByRole("banner").getByRole("link", { name: "입양" }).click();
    await expect(page).toHaveURL(/\/animals$/);

    await page.getByPlaceholder("이름 · 품종 · 지역으로 검색").fill("콩");
    await page.getByRole("button", { name: "검색" }).click();
    await expect(page).toHaveURL(/q=%EC%BD%A9/);
  });

  test("switches to the map and opens a shelter from a badged marker", async ({ page }) => {
    await login(page);
    await page.goto("animals");

    await page.getByRole("button", { name: "지도" }).click();
    await expect(page).toHaveURL(/view=map/);

    // Shelters holding matching animals are plotted as routable markers.
    const marker = page.getByRole("button", { name: "행복보호소" });
    await expect(marker).toBeVisible();

    await page.screenshot({ path: "e2e-artifacts/animal-map.png", fullPage: true });

    await marker.click();
    await expect(page).toHaveURL(/\/shelters\/haengbok-shelter$/);
  });
});
