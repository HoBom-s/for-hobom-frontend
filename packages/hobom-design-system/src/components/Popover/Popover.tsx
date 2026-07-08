import type { CSSProperties, ReactNode } from "react";
import { createPortal } from "react-dom";
import * as stylex from "@stylexjs/stylex";
import { usePopover } from "./usePopover";
import type { PopoverOrigin } from "./popover-position.lib";

interface PopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose?: () => void;
  /** Point on the anchor the popover attaches to. Defaults to bottom-left. */
  anchorOrigin?: PopoverOrigin;
  /** Point on the popover aligned to the anchor point. Defaults to top-left. */
  transformOrigin?: PopoverOrigin;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const DEFAULT_ANCHOR_ORIGIN: PopoverOrigin = { vertical: "bottom", horizontal: "left" };
const DEFAULT_TRANSFORM_ORIGIN: PopoverOrigin = { vertical: "top", horizontal: "left" };

const styles = stylex.create({
  root: {
    position: "fixed",
    inset: 0,
    zIndex: 1300,
  },
  backdrop: {
    position: "absolute",
    inset: 0,
    backgroundColor: "transparent",
  },
  paper: {
    position: "fixed",
    boxSizing: "border-box",
    minWidth: 16,
    maxHeight: "calc(100vh - 32px)",
    overflowY: "auto",
    backgroundColor: "var(--hb-color-surface)",
    color: "var(--hb-color-text-primary)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    borderRadius: 8,
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.16), 0 1px 4px rgba(0, 0, 0, 0.08)",
    outline: "none",
  },
});

export const Popover = ({
  open,
  anchorEl,
  onClose,
  anchorOrigin = DEFAULT_ANCHOR_ORIGIN,
  transformOrigin = DEFAULT_TRANSFORM_ORIGIN,
  className,
  style,
  children,
}: PopoverProps) => {
  const { coords, paperRef } = usePopover(open, anchorEl, anchorOrigin, transformOrigin, onClose);

  if (!open || !anchorEl) return null;

  const sx = stylex.props(styles.paper);

  return createPortal(
    <div {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.backdrop)} onMouseDown={onClose} />
      <div
        ref={paperRef}
        role="dialog"
        tabIndex={-1}
        className={[sx.className, className].filter(Boolean).join(" ") || undefined}
        style={{
          ...sx.style,
          top: coords?.top ?? 0,
          left: coords?.left ?? 0,
          // Hide until measured so the first paint doesn't flash at (0,0).
          visibility: coords ? "visible" : "hidden",
          ...style,
        }}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};
