import { toast } from "react-toastify";

/** react-toastify wrapper — success / warn / error toasts with a stable API. */
export const useToast = () => ({
  openSuccessToast: ({ message }: { message: string }) => toast.success(message),
  openWarnToast: ({ message }: { message: string }) => toast.warn(message),
  openErrorToast: ({ message }: { message: string }) => toast.error(message),
});
