import { Component, type ErrorInfo, type ReactNode } from "react";
import { useDataLot, type DataLot } from "hobom-data";
import { ReportProblemOutlined, RefreshOutlined } from "../../icons";
import { Box } from "../../components/Box/Box";
import { Button } from "../../components/Button/Button";
import { Paper } from "../../components/Paper/Paper";
import { Text } from "../../components/Text/Text";

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
  dataLot: DataLot;
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
    this.props.dataLot.invalidateQueries();
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
        <Box
          style={{
            width: "100%",
            ...(inline ? { flex: 1, minHeight: 120, paddingBlock: 32 } : { height: "100vh" }),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            variant="outlined"
            style={{
              textAlign: "center",
              paddingInline: 40,
              paddingBlock: 32,
              borderRadius: 16,
              maxWidth: 420,
              width: "100%",
            }}
          >
            <Box
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                backgroundColor: "var(--hb-color-danger)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <ReportProblemOutlined sx={{ color: "#fff", fontSize: 24 }} />
            </Box>
            <Text variant="subtitle1" fontWeight={700} style={{ marginBottom: 4 }}>
              문제가 발생했어요
            </Text>
            <Text
              variant="body2"
              style={{ color: "var(--hb-color-text-secondary)", fontSize: 13, lineHeight: 1.6 }}
            >
              요청을 처리하는 중 오류가 발생했어요.
              <br />
              잠시 후 다시 시도해 주세요.
            </Text>
            {error?.message ? (
              <Box
                style={{
                  marginTop: 16,
                  padding: 12,
                  backgroundColor: "var(--hb-color-canvas)",
                  borderRadius: 8,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "var(--hb-color-border)",
                }}
              >
                <Text
                  variant="caption"
                  style={{
                    display: "block",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-all",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    textAlign: "left",
                    color: "var(--hb-color-danger)",
                  }}
                >
                  {error.message}
                </Text>
              </Box>
            ) : null}
            <Button
              variant="primary"
              size="small"
              startIcon={<RefreshOutlined />}
              onClick={this.handleReset}
              style={{ marginTop: 20, fontWeight: 600, borderRadius: 12 }}
            >
              다시 시도
            </Button>
          </Paper>
        </Box>
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
 * - "다시 시도" 버튼 클릭 시 `dataLot.invalidateQueries()`를 호출하여 모든 쿼리를 재요청
 * - 에러 발생 시 `reportError`를 통해 componentStack과 함께 로깅
 */
export const ErrorBoundary = (props: Props) => {
  const dataLot = useDataLot();

  return <ErrorBoundaryInner {...props} dataLot={dataLot} />;
};
