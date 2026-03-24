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
    errors: (params: Record<string, unknown>) => ({
      queryKey: ["analytics", "errors", params],
      queryFn: vi.fn(),
    }),
  },
  toDateRange: () => ({ from: "2026-03-01T00:00:00Z", to: "2026-03-02T00:00:00Z" }),
  DEFAULT_TIME_RANGE: "LAST_24H",
}));

const { useErrorSearch } = await import("./useErrorSearch");

describe("useErrorSearch", () => {
  beforeEach(() => {
    useQueryMock.mockReset();
    useQueryMock.mockReturnValue({ data: undefined, isLoading: false });
  });

  describe("초기 상태", () => {
    it("초기 params에 exceptionType/source 필드가 있다", () => {
      const { result } = renderHook(() => useErrorSearch());

      expect(result.current.params).toEqual(
        expect.objectContaining({
          exceptionType: "",
          source: "",
          page: 1,
          pageSize: 20,
        }),
      );
      expect(result.current.params.from).toBeDefined();
      expect(result.current.params.to).toBeDefined();
    });
  });

  describe("search", () => {
    it("search 호출 시 exceptionType params가 업데이트된다", () => {
      const { result } = renderHook(() => useErrorSearch());

      act(() => result.current.search({ exceptionType: "NullPointer", source: "api-gateway" }));

      expect(result.current.params.exceptionType).toBe("NullPointer");
      expect(result.current.params.source).toBe("api-gateway");
    });

    it("search 호출 시 page가 1로 리셋된다", () => {
      const { result } = renderHook(() => useErrorSearch());

      act(() => result.current.search({ exceptionType: "err" }));
      act(() => result.current.goToPage(3));
      act(() => result.current.search({ exceptionType: "other" }));

      expect(result.current.params.page).toBe(1);
    });
  });

  describe("reset", () => {
    it("reset 호출 시 exceptionType/source도 초기화된다", () => {
      const { result } = renderHook(() => useErrorSearch());

      act(() => result.current.search({ exceptionType: "error" }));
      act(() => result.current.reset());

      expect(result.current.params.exceptionType).toBe("");
      expect(result.current.params.source).toBe("");
      expect(result.current.params.page).toBe(1);
    });
  });

  describe("goToPage", () => {
    it("goToPage 호출 시 page만 변경된다", () => {
      const { result } = renderHook(() => useErrorSearch());

      act(() => result.current.search({ exceptionType: "err" }));
      act(() => result.current.goToPage(2));

      expect(result.current.params.page).toBe(2);
      expect(result.current.params.exceptionType).toBe("err");
    });
  });
});
