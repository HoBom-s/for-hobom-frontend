import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

const navigateMock = vi.fn();
let mockSearch = "";
let mockPathname = "/test";

vi.mock("react-router-dom", () => ({
  useLocation: () => ({ search: mockSearch, pathname: mockPathname }),
  useNavigate: () => navigateMock,
}));

const { useRouterQuery } = await import("./useRouterQuery");

describe("useRouterQuery", () => {
  beforeEach(() => {
    navigateMock.mockReset();
    mockSearch = "";
    mockPathname = "/test";
  });

  it("현재 URL의 search를 URLSearchParams로 반환한다", () => {
    mockSearch = "?tab=all&status=open";
    const { result } = renderHook(() => useRouterQuery());

    expect(result.current.query.get("tab")).toBe("all");
    expect(result.current.query.get("status")).toBe("open");
  });

  it("updateQuery로 새 파라미터를 추가하면 navigate를 호출한다", () => {
    mockSearch = "";
    const { result } = renderHook(() => useRouterQuery());

    act(() => {
      result.current.updateQuery({ tab: "active" });
    });

    expect(navigateMock).toHaveBeenCalledWith("/test?tab=active", {
      replace: undefined,
    });
  });

  it("기존 파라미터를 보존하면서 새 파라미터를 추가한다", () => {
    mockSearch = "?tab=all";
    const { result } = renderHook(() => useRouterQuery());

    act(() => {
      result.current.updateQuery({ status: "open" });
    });

    expect(navigateMock).toHaveBeenCalledWith("/test?tab=all&status=open", {
      replace: undefined,
    });
  });

  it("undefined 값으로 파라미터를 삭제한다", () => {
    mockSearch = "?tab=all&status=open";
    const { result } = renderHook(() => useRouterQuery());

    act(() => {
      result.current.updateQuery({ tab: undefined });
    });

    expect(navigateMock).toHaveBeenCalledWith("/test?status=open", {
      replace: undefined,
    });
  });

  it("모든 파라미터를 삭제하면 pathname만 남는다", () => {
    mockSearch = "?tab=all";
    const { result } = renderHook(() => useRouterQuery());

    act(() => {
      result.current.updateQuery({ tab: undefined });
    });

    expect(navigateMock).toHaveBeenCalledWith("/test", {
      replace: undefined,
    });
  });

  it("replace: true 옵션이 navigate에 전달된다", () => {
    const { result } = renderHook(() => useRouterQuery());

    act(() => {
      result.current.updateQuery({ tab: "new" }, { replace: true });
    });

    expect(navigateMock).toHaveBeenCalledWith("/test?tab=new", {
      replace: true,
    });
  });

  it("여러 파라미터를 한 번에 추가/삭제할 수 있다", () => {
    mockSearch = "?a=1&b=2&c=3";
    const { result } = renderHook(() => useRouterQuery());

    act(() => {
      result.current.updateQuery({ a: undefined, b: "changed", d: "new" });
    });

    expect(navigateMock).toHaveBeenCalledWith("/test?b=changed&c=3&d=new", {
      replace: undefined,
    });
  });
});
