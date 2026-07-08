import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import * as stylex from "@stylexjs/stylex";

type Anchor = "left" | "right" | "top" | "bottom";

interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  /** Edge the drawer slides in from. Defaults to `"left"`. */
  anchor?: Anchor;
  className?: string;
  /** Applied to the sliding panel (e.g. its width). */
  style?: CSSProperties;
  children?: ReactNode;
}

const fadeIn = stylex.keyframes({ from: { opacity: 0 }, to: { opacity: 1 } });
const slideLeft = stylex.keyframes({
  from: { transform: "translateX(-100%)" },
  to: { transform: "translateX(0)" },
});
const slideRight = stylex.keyframes({
  from: { transform: "translateX(100%)" },
  to: { transform: "translateX(0)" },
});
const slideTop = stylex.keyframes({
  from: { transform: "translateY(-100%)" },
  to: { transform: "translateY(0)" },
});
const slideBottom = stylex.keyframes({
  from: { transform: "translateY(100%)" },
  to: { transform: "translateY(0)" },
});

const styles = stylex.create({
  backdrop: {
    position: "fixed",
    inset: 0,
    zIndex: 1300,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    animationName: fadeIn,
    animationDuration: "0.2s",
    animationTimingFunction: "ease",
  },
  panel: {
    position: "fixed",
    zIndex: 1300,
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    maxWidth: "100vw",
    maxHeight: "100vh",
    overflow: "auto",
    backgroundColor: "var(--hb-color-surface)",
    color: "var(--hb-color-text-primary)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)",
    outline: "none",
    animationDuration: "0.25s",
    animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  left: { top: 0, left: 0, height: "100%", animationName: slideLeft },
  right: { top: 0, right: 0, height: "100%", animationName: slideRight },
  top: { top: 0, left: 0, width: "100%", animationName: slideTop },
  bottom: { bottom: 0, left: 0, width: "100%", animationName: slideBottom },
});

const ANCHOR_STYLE = {
  left: styles.left,
  right: styles.right,
  top: styles.top,
  bottom: styles.bottom,
} as const;

export const Drawer = ({
  open,
  onClose,
  anchor = "left",
  className,
  style,
  children,
}: DrawerProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    panelRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const sx = stylex.props(styles.panel, ANCHOR_STYLE[anchor]);

  return createPortal(
    <>
      <div {...stylex.props(styles.backdrop)} onMouseDown={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={[sx.className, className].filter(Boolean).join(" ") || undefined}
        style={{ ...sx.style, ...style }}
      >
        {children}
      </div>
    </>,
    document.body,
  );
};
