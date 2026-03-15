// @vitest-environment happy-dom
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { DataLotProvider } from "hobom-data";
import { MemoryRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "@/shared/ui";
import { createTestDataLot } from "@/test/create-wrapper";

vi.mock("@/shared/lib", () => ({
  reportError: vi.fn(),
}));

/**
 * Shell의 ErrorBoundary + resetKey={pathname} 패턴을 재현하는 경량 래퍼.
 * 실제 Shell은 AppShell 의존성이 무거워 직접 사용하지 않는다.
 */
const ShellLite = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  return (
    <ErrorBoundary resetKey={pathname} inline>
      {children}
    </ErrorBoundary>
  );
};

const AlwaysThrow = () => {
  throw new Error("테스트 에러");
};

/** ErrorBoundary 외부에 배치되어 에러 상태에서도 네비게이션 가능 */
const NavButton = ({ to }: { to: string }) => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(to)} type="button">
      이동
    </button>
  );
};

describe("ErrorBoundary 통합: 라우트 연동", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("자식 컴포넌트가 throw하면 인라인 fallback UI를 표시한다", () => {
    render(
      <DataLotProvider client={createTestDataLot()}>
        <MemoryRouter initialEntries={["/page-a"]}>
          <Routes>
            <Route
              path="/page-a"
              element={
                <ShellLite>
                  <AlwaysThrow />
                </ShellLite>
              }
            />
          </Routes>
        </MemoryRouter>
      </DataLotProvider>,
    );

    expect(screen.getByText("문제가 발생했어요")).toBeDefined();
  });

  it("다른 라우트로 이동하면 에러 상태가 리셋된다", () => {
    render(
      <DataLotProvider client={createTestDataLot()}>
        <MemoryRouter initialEntries={["/page-a"]}>
          <NavButton to="/page-b" />
          <Routes>
            <Route
              path="/page-a"
              element={
                <ShellLite>
                  <AlwaysThrow />
                </ShellLite>
              }
            />
            <Route
              path="/page-b"
              element={
                <ShellLite>
                  <div>페이지 B</div>
                </ShellLite>
              }
            />
          </Routes>
        </MemoryRouter>
      </DataLotProvider>,
    );

    expect(screen.getByText("문제가 발생했어요")).toBeDefined();

    fireEvent.click(screen.getByText("이동"));

    expect(screen.getByText("페이지 B")).toBeDefined();
    expect(screen.queryByText("문제가 발생했어요")).toBeNull();
  });

  it('"다시 시도" 버튼 클릭 시 dataLot.invalidateQueries를 호출하고 에러를 리셋한다', () => {
    const dataLot = createTestDataLot();
    const invalidateSpy = vi.spyOn(dataLot, "invalidateQueries");

    /**
     * React 18+ concurrent mode에서는 에러 발생 시 렌더를 재시도한다.
     * render 중 상태를 변경하는 throwCount++ 패턴은 retry 시 정상 렌더링되어
     * ErrorBoundary를 우회하므로, 외부 플래그로 명시적 제어한다.
     */
    const flag = { shouldThrow: true };
    const MaybeThrow = () => {
      if (flag.shouldThrow) throw new Error("테스트 에러");

      return <div>정상 렌더링</div>;
    };

    render(
      <DataLotProvider client={dataLot}>
        <MemoryRouter initialEntries={["/page-a"]}>
          <Routes>
            <Route
              path="/page-a"
              element={
                <ShellLite>
                  <MaybeThrow />
                </ShellLite>
              }
            />
          </Routes>
        </MemoryRouter>
      </DataLotProvider>,
    );

    expect(screen.getByText("문제가 발생했어요")).toBeDefined();

    flag.shouldThrow = false;
    fireEvent.click(screen.getByText("다시 시도"));

    expect(invalidateSpy).toHaveBeenCalled();
    expect(screen.getByText("정상 렌더링")).toBeDefined();
  });
});
