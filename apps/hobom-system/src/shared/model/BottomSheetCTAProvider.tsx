import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { BottomSheetCTA } from "@/shared/ui";
import { BottomSheetCTAContext, type SheetOptions } from "./useBottomSheetCTA";

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
