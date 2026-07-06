import { createContext, useContext, type ReactNode } from "react";

export interface SheetOptions {
  title?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  height?: string;
}

export interface BottomSheetContextType {
  onOpen: (options: SheetOptions) => void;
  onClose: () => void;
}

// The context lives in this component-free module so its identity stays stable
// across Fast Refresh. Colocating it with the provider component (a mixed
// component/non-component export) disables Fast Refresh for the file, which lets
// an HMR update recreate the context and detach mounted consumers ("must be used
// within a provider" despite being wrapped).
export const BottomSheetCTAContext = createContext<BottomSheetContextType | null>(null);

export const useBottomSheetCTA = () => {
  const ctx = useContext(BottomSheetCTAContext);

  if (ctx == null) {
    throw new Error("BottomSheetProvider 안에서만 사용해야 합니다.");
  }

  return ctx;
};
