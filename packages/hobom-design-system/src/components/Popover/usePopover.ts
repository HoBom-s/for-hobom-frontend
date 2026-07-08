import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { computePopoverPosition, type Coords, type PopoverOrigin } from "./popover-position.lib";

/**
 * Popover positioning and dismissal.
 *
 * Owns the viewport-space coordinate computation, reposition on scroll/resize,
 * Escape-to-close, and focus handling (focus the panel on open, restore to the
 * previously focused element on close). The component only renders what this
 * returns.
 */
export function usePopover(
  open: boolean,
  anchorEl: HTMLElement | null,
  anchorOrigin: PopoverOrigin,
  transformOrigin: PopoverOrigin,
  onClose?: () => void,
) {
  const [coords, setCoords] = useState<Coords | null>(null);
  const paperRef = useRef<HTMLDivElement | null>(null);

  const { vertical: aV, horizontal: aH } = anchorOrigin;
  const { vertical: tV, horizontal: tH } = transformOrigin;

  const reposition = useCallback(() => {
    const paper = paperRef.current;

    if (!anchorEl || !paper) return;
    const r = anchorEl.getBoundingClientRect();

    setCoords(
      computePopoverPosition(
        { top: r.top, left: r.left, width: r.width, height: r.height },
        { width: paper.offsetWidth, height: paper.offsetHeight },
        { vertical: aV, horizontal: aH },
        { vertical: tV, horizontal: tH },
        { width: window.innerWidth, height: window.innerHeight },
      ),
    );
  }, [anchorEl, aV, aH, tV, tH]);

  useLayoutEffect(() => {
    // When closed the component renders nothing, so leave the last coords in
    // place; a reopen recomputes them (pre-paint) before they're ever shown.
    if (!open) return;

    reposition();

    const onScrollOrResize = () => reposition();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose?.();
    };

    // capture=true so the popover repositions while any ancestor scrolls.
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, reposition, onClose]);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    paperRef.current?.focus();

    return () => previouslyFocused?.focus?.();
  }, [open]);

  return { coords, paperRef };
}
