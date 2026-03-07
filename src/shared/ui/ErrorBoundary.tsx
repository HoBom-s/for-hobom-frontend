import { Component, type ErrorInfo, type ReactNode } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { ReportProblemOutlined, RefreshOutlined } from "@mui/icons-material";
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
            ...(inline
              ? { flex: 1, minHeight: 120, py: 4 }
              : { height: "100vh" }),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
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
            <Box
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
            </Box>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.5 }}>
              문제가 발생했어요
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: 13, lineHeight: 1.6 }}
            >
              요청을 처리하는 중 오류가 발생했어요.
              <br />
              잠시 후 다시 시도해 주세요.
            </Typography>
            {error?.message ? (
              <Box
                sx={{
                  mt: 2,
                  p: 1.5,
                  bgcolor: "grey.50",
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography
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
                </Typography>
              </Box>
            ) : null}
            <Button
              variant="contained"
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
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}
