import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { BottomSheetCTA } from "@/shared/ui";

interface SheetOptions {
  title?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  height?: string;
}

interface BottomSheetContextType {
  onOpen: (options: SheetOptions) => void;
  onClose: () => void;
}

const BottomSheetCTAContext = createContext<BottomSheetContextType | null>(null);

export const BottomSheetCTAProvider = ({ children }: { children: ReactNode }) => {
  const [sheet, setSheet] = useState<SheetOptions | null>(null);
  const [open, setOpen] = useState(false);

  const queue = useRef<SheetOptions[]>([]);
  const isShowing = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const processNext = () => {
    const next = queue.current.shift();

    if (next === undefined) {
      isShowing.current = false;

      return;
    }
    setSheet(next);
    setOpen(true);
    isShowing.current = true;
  };

  const onOpen = useCallback((options: SheetOptions) => {
    if (isShowing.current) {
      queue.current.push(options);
    } else {
      setSheet(options);
      setOpen(true);
      isShowing.current = true;
    }
  }, []);

  const onClose = useCallback(() => {
    const TIMEOUT_MS = 300;

    setOpen(false);
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      setSheet(null);
      processNext();
    }, TIMEOUT_MS);
  }, []);

  return (
    <BottomSheetCTAContext.Provider value={{ onOpen, onClose }}>
      {children}
      <BottomSheetCTA open={open} onClose={onClose} height={sheet?.height}>
        {sheet?.title != null ? <BottomSheetCTA.Title>{sheet.title}</BottomSheetCTA.Title> : null}
        {sheet?.content != null ? <BottomSheetCTA.Body>{sheet.content}</BottomSheetCTA.Body> : null}
        {sheet?.footer != null ? (
          <BottomSheetCTA.Footer>{sheet.footer}</BottomSheetCTA.Footer>
        ) : null}
      </BottomSheetCTA>
    </BottomSheetCTAContext.Provider>
  );
};

// Context, provider, and hook are intentionally colocated; Fast Refresh is an
// HMR heuristic that doesn't apply to this consumer hook export.
// eslint-disable-next-line react-refresh/only-export-components
export const useBottomSheetCTA = () => {
  const ctx = useContext(BottomSheetCTAContext);

  if (ctx == null) {
    throw new Error("BottomSheetProvider 안에서만 사용해야 합니다.");
  }

  return ctx;
};
