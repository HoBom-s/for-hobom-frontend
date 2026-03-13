import { createElement } from "react";
import { toast } from "react-toastify";

/** react-toastify 래퍼. success/warn/error/undo 토스트를 표시한다. */
export const useToast = () => {
  const { success, warn, error } = toast;

  return {
    openSuccessToast: ({ message }: { message: string }) => {
      success(message);
    },
    openWarnToast: ({ message }: { message: string }) => {
      warn(message);
    },
    openErrorToast: ({ message }: { message: string }) => {
      error(message);
    },
    openUndoToast: ({
      message,
      onUndo,
    }: {
      message: string;
      onUndo: () => void;
    }) => {
      toast(
        ({ closeToast }) =>
          createElement(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                width: "100%",
              },
            },
            createElement("span", null, message),
            createElement(
              "button",
              {
                onClick: () => {
                  onUndo();
                  closeToast?.();
                },
                style: {
                  background: "rgba(70,128,255,0.15)",
                  border: "none",
                  color: "#6ea8fe",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  padding: "6px 12px",
                  borderRadius: 8,
                  transition: "background 0.15s",
                },
              },
              "실행 취소",
            ),
          ),
        { autoClose: 5000, closeOnClick: false },
      );
    },
  };
};
