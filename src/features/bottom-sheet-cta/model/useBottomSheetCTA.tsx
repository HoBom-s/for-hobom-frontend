import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { BottomSheetCTA } from "@/features/bottom-sheet-cta/ui";

interface SheetOptions {
  title?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
}

interface BottomSheetContextType {
  onOpen: (options: SheetOptions) => void;
  onClose: () => void;
}

const BottomSheetCTAContext = createContext<BottomSheetContextType | null>(
  null,
);

export const BottomSheetCTAProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [sheet, setSheet] = useState<SheetOptions | null>(null);
  const [open, setOpen] = useState(false);

  const queue = useRef<SheetOptions[]>([]);
  const isShowing = useRef(false);

  const processNext = () => {
    if (queue.current.length > 0) {
      const next = queue.current.shift()!;
      setSheet(next);
      setOpen(true);
      isShowing.current = true;
    } else {
      isShowing.current = false;
    }
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
    setTimeout(() => {
      setSheet(null);
      processNext();
    }, TIMEOUT_MS);
  }, []);

  return (
    <BottomSheetCTAContext.Provider value={{ onOpen, onClose }}>
      {children}
      <BottomSheetCTA open={open} onClose={onClose}>
        {sheet?.title != null ? (
          <BottomSheetCTA.Title>{sheet.title}</BottomSheetCTA.Title>
        ) : null}
        {sheet?.content != null ? (
          <BottomSheetCTA.Body>{sheet.content}</BottomSheetCTA.Body>
        ) : null}
        {sheet?.footer != null ? (
          <BottomSheetCTA.Footer>{sheet.footer}</BottomSheetCTA.Footer>
        ) : null}
      </BottomSheetCTA>
    </BottomSheetCTAContext.Provider>
  );
};

export const useBottomSheetCTA = () => {
  const ctx = useContext(BottomSheetCTAContext);
  if (ctx == null) {
    throw new Error("BottomSheetProvider 안에서만 사용해야 합니다.");
  }

  return ctx;
};
