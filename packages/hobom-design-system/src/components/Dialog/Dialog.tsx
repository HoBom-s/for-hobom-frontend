import {
  useEffect,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import * as stylex from "@stylexjs/stylex";

type DialogSize = "xs" | "sm" | "md" | "lg";

const MAX_WIDTH: Record<DialogSize, number> = { xs: 444, sm: 600, md: 900, lg: 1200 };

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

const focusable = (root: HTMLElement | null): HTMLElement[] =>
  root ? Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)) : [];

const fadeIn = stylex.keyframes({ from: { opacity: 0 }, to: { opacity: 1 } });
const popIn = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(8px) scale(0.98)" },
  to: { opacity: 1, transform: "translateY(0) scale(1)" },
});

const styles = stylex.create({
  backdrop: {
    position: "fixed",
    inset: 0,
    zIndex: 1300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    animationName: fadeIn,
    animationDuration: "0.2s",
    animationTimingFunction: "ease",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    width: "100%",
    maxHeight: "100%",
    overflow: "hidden",
    backgroundColor: "var(--hb-color-surface)",
    color: "var(--hb-color-text-primary)",
    borderRadius: 12,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.24)",
    outline: "none",
    animationName: popIn,
    animationDuration: "0.2s",
    animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  title: {
    margin: 0,
    padding: "16px 24px",
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "1.25rem",
    fontWeight: 600,
    lineHeight: 1.4,
    flexShrink: 0,
  },
  content: {
    padding: "12px 24px 20px",
    overflowY: "auto",
    flex: 1,
  },
  dividers: {
    paddingBlock: 16,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "var(--hb-color-border)",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "var(--hb-color-border)",
  },
  contentText: {
    margin: 0,
    color: "var(--hb-color-text-secondary)",
    fontSize: "0.875rem",
    lineHeight: 1.5,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
    padding: "8px 16px",
    flexShrink: 0,
  },
});

interface RootProps {
  open: boolean;
  onClose?: () => void;
  /** Caps the paper width. Defaults to `"sm"`. */
  size?: DialogSize;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const Root = ({ open, onClose, size = "sm", className, style, children }: RootProps) => {
  const paperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    (focusable(paperRef.current)[0] ?? paperRef.current)?.focus();

    return () => previouslyFocused?.focus?.();
  }, [open]);

  if (!open) return null;

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      onClose?.();

      return;
    }

    if (event.key !== "Tab") return;
    const items = focusable(paperRef.current);

    if (items.length === 0) {
      event.preventDefault();

      return;
    }

    const first = items[0];
    const last = items[items.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  const sx = stylex.props(styles.paper);

  return createPortal(
    <div {...stylex.props(styles.backdrop)} onMouseDown={onClose}>
      <div
        ref={paperRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        onKeyDown={onKeyDown}
        onMouseDown={(event) => event.stopPropagation()}
        className={[sx.className, className].filter(Boolean).join(" ") || undefined}
        style={{ ...sx.style, maxWidth: MAX_WIDTH[size], ...style }}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

const Title = ({ className, style, children, ...rest }: HTMLAttributes<HTMLHeadingElement>) => {
  const sx = stylex.props(styles.title);

  return (
    <h2
      {...rest}
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...style }}
    >
      {children}
    </h2>
  );
};

interface ContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Add top and bottom rules to separate the content from title/actions. */
  dividers?: boolean;
}

const Content = ({ dividers = false, className, style, children, ...rest }: ContentProps) => {
  const sx = stylex.props(styles.content, dividers && styles.dividers);

  return (
    <div
      {...rest}
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...style }}
    >
      {children}
    </div>
  );
};

const ContentText = ({
  className,
  style,
  children,
  ...rest
}: HTMLAttributes<HTMLParagraphElement>) => {
  const sx = stylex.props(styles.contentText);

  return (
    <p
      {...rest}
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...style }}
    >
      {children}
    </p>
  );
};

const Actions = ({ className, style, children, ...rest }: HTMLAttributes<HTMLDivElement>) => {
  const sx = stylex.props(styles.actions);

  return (
    <div
      {...rest}
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...style }}
    >
      {children}
    </div>
  );
};

export const Dialog = { Root, Title, Content, Actions, ContentText };
