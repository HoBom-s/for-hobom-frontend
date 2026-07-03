import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { computeAnchorPosition, type Align, type Coords, type Side } from "./tooltip-position";

/**
 * Tooltip open/close behavior and positioning.
 *
 * Owns the delayed open, viewport-space coordinate computation, reposition on
 * scroll/resize, and Escape-to-close. The component only renders what this
 * returns.
 */
export function useTooltip(side: Side, align: Align, offset: number, enterDelay: number) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<Coords | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const show = useCallback(() => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(true), enterDelay);
  }, [enterDelay]);

  const hide = useCallback(() => {
    window.clearTimeout(timer.current);
    setOpen(false);
    setCoords(null);
  }, []);

  const reposition = useCallback(() => {
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;

    if (!trigger || !tooltip) return;
    const r = trigger.getBoundingClientRect();

    setCoords(
      computeAnchorPosition(
        { top: r.top, left: r.left, width: r.width, height: r.height },
        { width: tooltip.offsetWidth, height: tooltip.offsetHeight },
        side,
        align,
        offset,
      ),
    );
  }, [side, align, offset]);

  useLayoutEffect(() => {
    if (!open) return;
    reposition();

    const onScrollOrResize = () => reposition();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide();
    };

    // capture=true so the tooltip repositions while any ancestor scrolls.
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, reposition, hide]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return { open, coords, triggerRef, tooltipRef, show, hide };
}
