// 공개 랜딩 페이지가 전역 로더 없이 첫 렌더에 노출되는지 검증하는 테스트
// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { AppProvider } from "./AppProvider";
import { AppRouter } from "./AppRouter";

vi.mock("@/entities/user", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/entities/user")>();

  return {
    ...actual,
    useCurrentUser: () => ({
      user: undefined,
      isAuthenticated: false,
      isLoading: false,
    }),
  };
});

describe("AppRouter", () => {
  it("renders the public landing immediately without the global loading screen", () => {
    render(
      // The landing now reads the public shelter directory, so it needs the same
      // DataLot the real tree provides — the assertions below still pin that
      // fetching it costs no global loading screen.
      <AppProvider>
        <MemoryRouter initialEntries={["/"]}>
          <AppRouter />
        </MemoryRouter>
      </AppProvider>,
    );

    expect(screen.getByRole("heading", { level: 1 })).not.toBeNull();
    expect(screen.queryByText("불러오는 중...")).toBeNull();
  });
});
