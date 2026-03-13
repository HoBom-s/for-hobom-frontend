import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "./ErrorBoundary";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return {
    queryClient,
    Wrapper: ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  };
};

const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) throw new Error("테스트 에러");
  return <div>정상 렌더링</div>;
};

describe("ErrorBoundary", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("정상 children을 렌더링한다", () => {
    const { Wrapper } = createWrapper();
    render(
      <Wrapper>
        <ErrorBoundary>
          <div>정상 콘텐츠</div>
        </ErrorBoundary>
      </Wrapper>,
    );

    expect(screen.getByText("정상 콘텐츠")).toBeDefined();
  });

  it("에러 발생 시 기본 fallback UI를 표시한다", () => {
    const { Wrapper } = createWrapper();
    render(
      <Wrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </Wrapper>,
    );

    expect(screen.getByText("문제가 발생했어요")).toBeDefined();
    expect(screen.getByText("다시 시도")).toBeDefined();
  });

  it("custom fallback prop 전달 시 해당 UI를 표시한다", () => {
    const { Wrapper } = createWrapper();
    render(
      <Wrapper>
        <ErrorBoundary fallback={<div>커스텀 에러 UI</div>}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </Wrapper>,
    );

    expect(screen.getByText("커스텀 에러 UI")).toBeDefined();
  });

  it("resetKey 변경 시 에러 상태를 리셋한다", () => {
    const { Wrapper } = createWrapper();
    const { rerender } = render(
      <Wrapper>
        <ErrorBoundary resetKey="key-1">
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </Wrapper>,
    );

    expect(screen.getByText("문제가 발생했어요")).toBeDefined();

    rerender(
      <Wrapper>
        <ErrorBoundary resetKey="key-2">
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      </Wrapper>,
    );

    expect(screen.getByText("정상 렌더링")).toBeDefined();
  });

  it("다시 시도 버튼 클릭 시 queryClient.invalidateQueries를 호출한다", () => {
    const { queryClient, Wrapper } = createWrapper();
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    render(
      <Wrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </Wrapper>,
    );

    fireEvent.click(screen.getByText("다시 시도"));
    expect(invalidateSpy).toHaveBeenCalled();
  });

  it("에러 메시지가 있으면 표시한다", () => {
    const { Wrapper } = createWrapper();
    const ThrowWithMessage = () => {
      throw new Error("상세 에러 메시지");
    };

    render(
      <Wrapper>
        <ErrorBoundary>
          <ThrowWithMessage />
        </ErrorBoundary>
      </Wrapper>,
    );

    expect(screen.getByText("상세 에러 메시지")).toBeDefined();
  });
});
