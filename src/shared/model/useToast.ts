import { toast } from "react-toastify";

/** react-toastify 래퍼. success/warn/error 토스트를 표시한다. */
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
  };
};
