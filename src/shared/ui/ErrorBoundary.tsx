import { Component, type ErrorInfo, type ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
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

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // @TODO Sentry
    console.error(error);
    console.error(errorInfo);
  }

  render() {
    const { hasError, error } = this.state;
    const { fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              mx: "auto",
              textAlign: "center",
            }}
          >
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
                }}
              >
                {error.message}
              </Typography>
            ) : null}
          </Box>
        </div>
      );
    }

    return this.props.children;
  }
}
