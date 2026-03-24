// @vitest-environment happy-dom
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

const useQueryMock = vi.fn();

vi.mock("hobom-data", () => ({
  useQuery: (opts: Record<string, unknown>) => useQueryMock(opts),
  queryOptions: (opts: Record<string, unknown>) => opts,
}));

vi.mock("@/entities/analytics", () => ({
  analyticsQueries: {
    requests: (params: Record<string, unknown>) => ({
      queryKey: ["analytics", "requests", params],
      queryFn: vi.fn(),
    }),
  },
  toDateRange: () => ({ from: "2026-03-01T00:00:00Z", to: "2026-03-02T00:00:00Z" }),
  DEFAULT_TIME_RANGE: "LAST_24H",
}));

const { useRequestSearch } = await import("./useRequestSearch");

describe("useRequestSearch", () => {
  beforeEach(() => {
    useQueryMock.mockReset();
    useQueryMock.mockReturnValue({ data: undefined, isLoading: false });
  });

  describe("초기 상태", () => {
    it("data가 undefined이다", () => {
      const { result } = renderHook(() => useRequestSearch());

      expect(result.current.data).toBeUndefined();
    });

    it("초기 params가 기본값이다", () => {
      const { result } = renderHook(() => useRequestSearch());

      expect(result.current.params).toEqual(
        expect.objectContaining({
          method: "",
          path: "",
          statusCode: undefined,
          page: 1,
          pageSize: 20,
        }),
      );
      expect(result.current.params.from).toBeDefined();
      expect(result.current.params.to).toBeDefined();
    });
  });

  describe("search", () => {
    it("search 호출 시 params가 업데이트된다", () => {
      const { result } = renderHook(() => useRequestSearch());

      act(() => result.current.search({ method: "POST", path: "/api/test" }));

      expect(result.current.params.method).toBe("POST");
      expect(result.current.params.path).toBe("/api/test");
    });

    it("search 호출 시 page가 1로 리셋된다", () => {
      const { result } = renderHook(() => useRequestSearch());

      act(() => result.current.search({ method: "GET" }));
      act(() => result.current.goToPage(3));
      act(() => result.current.search({ method: "POST" }));

      expect(result.current.params.page).toBe(1);
    });
  });

  describe("reset", () => {
    it("reset 호출 시 초기 상태로 돌아간다", () => {
      const { result } = renderHook(() => useRequestSearch());

      act(() => result.current.search({ method: "GET" }));
      act(() => result.current.reset());

      expect(result.current.params.method).toBe("");
      expect(result.current.params.page).toBe(1);
    });
  });

  describe("goToPage", () => {
    it("goToPage 호출 시 page만 변경된다", () => {
      const { result } = renderHook(() => useRequestSearch());

      act(() => result.current.search({ method: "GET" }));
      act(() => result.current.goToPage(5));

      expect(result.current.params.page).toBe(5);
      expect(result.current.params.method).toBe("GET");
    });
  });
});
