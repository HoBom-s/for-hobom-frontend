import { Component, type ErrorInfo, type ReactNode } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ErrorOutline, RefreshOutlined } from "@mui/icons-material";
import { reportError } from "@/shared/lib";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  /** 이 값이 변하면 에러 상태를 자동 리셋 */
  resetKey?: string;
  /** 풀스크린(100vh) 대신 콘텐츠 영역만 채우는 fallback 사용 */
  inline?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidUpdate(prevProps: Props) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false, error: null });
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    reportError(error, { componentStack: errorInfo.componentStack });
  }

  private handleReset = () => {
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
          sx={{
            width: "100%",
            ...(inline ? { flex: 1, minHeight: 0 } : { height: "100vh" }),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <ErrorOutline color="info" sx={{ fontSize: 48 }} />
            <Typography variant="h5" gutterBottom>
              앗!
            </Typography>
            <Typography variant="caption" color="text.secondary">
              문제가 발생했어요.
              <br />
              잠시 후 다시 시도해 주세요.
            </Typography>
            {process.env.NODE_ENV === "development" && error ? (
              <Typography
                variant="caption"
                color="error"
                sx={{
                  display: "block",
                  mt: 2,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all",
                  maxWidth: 480,
                  mx: "auto",
                }}
              >
                {error.message}
              </Typography>
            ) : null}
            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<RefreshOutlined />}
                onClick={this.handleReset}
                sx={{ textTransform: "none" }}
              >
                다시 시도
              </Button>
            </Box>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}
