import { Component, type ErrorInfo, type ReactNode } from "react";
import { ReportProblemOutlined, RefreshOutlined } from "hobom-design-system/icons";
import { useQueryClient, type QueryClient } from "@tanstack/react-query";
import { Hb } from "hobom-design-system";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  /** 이 값이 변하면 에러 상태를 자동 리셋 */
  resetKey?: string;
  /** 풀스크린(100vh) 대신 콘텐츠 영역만 채우는 fallback 사용 */
  inline?: boolean;
  /** 에러 발생 시 호출되는 콜백. componentStack 정보를 포함한 errorInfo를 전달. */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface InternalProps extends Props {
  queryClient: QueryClient;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundaryInner extends Component<InternalProps, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidUpdate(prevProps: InternalProps) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false, error: null });
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  private handleReset = () => {
    this.props.queryClient.invalidateQueries();
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { hasError, error } = this.state;
    const { fallback, inline } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <Hb.Box
          sx={{
            width: "100%",
            ...(inline ? { flex: 1, minHeight: 120, py: 4 } : { height: "100vh" }),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Hb.Paper
            variant="outlined"
            sx={{
              textAlign: "center",
              px: 5,
              py: 4,
              borderRadius: 2,
              maxWidth: 420,
              width: "100%",
            }}
          >
            <Hb.Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                bgcolor: "error.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
              }}
            >
              <ReportProblemOutlined sx={{ color: "#fff", fontSize: 24 }} />
            </Hb.Box>
            <Hb.Text variant="subtitle1" fontWeight={700} sx={{ mb: 0.5 }}>
              문제가 발생했어요
            </Hb.Text>
            <Hb.Text variant="body2" color="text.secondary" sx={{ fontSize: 13, lineHeight: 1.6 }}>
              요청을 처리하는 중 오류가 발생했어요.
              <br />
              잠시 후 다시 시도해 주세요.
            </Hb.Text>
            {error?.message ? (
              <Hb.Box
                sx={{
                  mt: 2,
                  p: 1.5,
                  bgcolor: "grey.50",
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Hb.Text
                  variant="caption"
                  color="error"
                  sx={{
                    display: "block",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-all",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    textAlign: "left",
                  }}
                >
                  {error.message}
                </Hb.Text>
              </Hb.Box>
            ) : null}
            <Hb.Button
              variant="primary"
              size="small"
              startIcon={<RefreshOutlined />}
              onClick={this.handleReset}
              sx={{
                mt: 2.5,
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 1.5,
                boxShadow: "none",
                "&:hover": { boxShadow: "none" },
              }}
            >
              다시 시도
            </Hb.Button>
          </Hb.Paper>
        </Hb.Box>
      );
    }

    return this.props.children;
  }
}

/**
 * React Error Boundary 래퍼.
 *
 * - `resetKey` 변경 시 에러 상태를 자동 리셋
 * - `inline` 모드에서는 100vh 대신 콘텐츠 영역 내에서만 fallback 표시
 * - "다시 시도" 버튼 클릭 시 `queryClient.invalidateQueries()`를 호출하여 모든 쿼리를 재요청
 * - 에러 발생 시 `reportError`를 통해 componentStack과 함께 로깅
 */
export const ErrorBoundary = (props: Props) => {
  const queryClient = useQueryClient();

  return <ErrorBoundaryInner {...props} queryClient={queryClient} />;
};
