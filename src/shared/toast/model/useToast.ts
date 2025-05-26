import { toast } from "react-toastify";

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
