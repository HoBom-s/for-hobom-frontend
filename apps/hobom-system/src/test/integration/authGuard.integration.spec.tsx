import { useEffect } from "react";
import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import {
  MemoryRouter,
  Route,
  Routes,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { UNAUTHORIZED_EVENT } from "@/shared/api";
import { RoutesConfig } from "@/shared/config";
import { useToast } from "@/shared/model";
import { createTestQueryClient } from "@/test/create-wrapper";

const mockOpenWarnToast = vi.fn();

vi.mock("@/shared/model", async (importOriginal) => {
  const original = await importOriginal<typeof import("@/shared/model")>();

  return {
    ...original,
    useToast: () => ({
      openSuccessToast: vi.fn(),
      openWarnToast: mockOpenWarnToast,
      openErrorToast: vi.fn(),
    }),
  };
});

/**
 * AppRouter의 UNAUTHORIZED_EVENT 핸들러 로직만 재현하는 테스트 하네스.
 * 실제 AppRouter는 lazy import + 전체 페이지 렌더링이 필요해 직접 사용하지 않는다.
 *
 * @see src/apps/ui/AppRouter.tsx:125-135
 */
const AuthGuardHarness = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { openWarnToast } = useToast();

  useEffect(() => {
    const handler = () => {
      queryClient.clear();
      openWarnToast({
        message: "인증이 필요해요. 로그인 페이지로 이동합니다.",
      });
      navigate(RoutesConfig.AUTH.LOGIN, { replace: true });
    };

    window.addEventListener(UNAUTHORIZED_EVENT, handler);

    return () => window.removeEventListener(UNAUTHORIZED_EVENT, handler);
  }, [navigate, queryClient, openWarnToast]);

  return <Outlet />;
};

/** 현재 pathname을 DOM에 노출하여 assertion에 사용 */
const LocationDisplay = () => {
  const { pathname } = useLocation();

  return <div data-testid="location">{pathname}</div>;
};

const dispatchUnauthorized = () => {
  act(() => {
    window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT));
  });
};

describe("인증 가드 통합: UNAUTHORIZED_EVENT 플로우", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("UNAUTHORIZED_EVENT 발생 시 로그인 페이지로 리다이렉트한다", () => {
    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter initialEntries={[RoutesConfig.MAIN.DAILY_TODO]}>
          <Routes>
            <Route element={<AuthGuardHarness />}>
              <Route
                path={RoutesConfig.MAIN.DAILY_TODO}
                element={<div>할 일 페이지</div>}
              />
            </Route>
            <Route
              path={RoutesConfig.AUTH.LOGIN}
              element={<LocationDisplay />}
            />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(screen.getByText("할 일 페이지")).toBeDefined();

    dispatchUnauthorized();

    expect(screen.getByTestId("location").textContent).toBe(
      RoutesConfig.AUTH.LOGIN,
    );
  });

  it("UNAUTHORIZED_EVENT 발생 시 queryClient.clear()를 호출한다", () => {
    const queryClient = createTestQueryClient();

    queryClient.setQueryData(["test-key"], { data: "cached" });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[RoutesConfig.MAIN.DAILY_TODO]}>
          <Routes>
            <Route element={<AuthGuardHarness />}>
              <Route
                path={RoutesConfig.MAIN.DAILY_TODO}
                element={<div>할 일 페이지</div>}
              />
            </Route>
            <Route path={RoutesConfig.AUTH.LOGIN} element={<div>로그인</div>} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(queryClient.getQueryData(["test-key"])).toEqual({ data: "cached" });

    dispatchUnauthorized();

    expect(queryClient.getQueryData(["test-key"])).toBeUndefined();
  });

  it("UNAUTHORIZED_EVENT 발생 시 경고 토스트를 표시한다", () => {
    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter initialEntries={[RoutesConfig.MAIN.DAILY_TODO]}>
          <Routes>
            <Route element={<AuthGuardHarness />}>
              <Route
                path={RoutesConfig.MAIN.DAILY_TODO}
                element={<div>할 일 페이지</div>}
              />
            </Route>
            <Route path={RoutesConfig.AUTH.LOGIN} element={<div>로그인</div>} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    dispatchUnauthorized();

    expect(mockOpenWarnToast).toHaveBeenCalledWith({
      message: "인증이 필요해요. 로그인 페이지로 이동합니다.",
    });
  });
});
