import { useState, type HTMLAttributes, type ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";

interface CollapseProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the content is expanded. */
  in?: boolean;
  /** Remove the children from the DOM once collapsed. */
  unmountOnExit?: boolean;
  children?: ReactNode;
}

const styles = stylex.create({
  root: {
    display: "grid",
    transition: "grid-template-rows 0.25s ease",
  },
  open: { gridTemplateRows: "1fr" },
  closed: { gridTemplateRows: "0fr" },
  inner: { overflow: "hidden", minHeight: 0 },
});

export const Collapse = ({
  in: open = false,
  unmountOnExit = false,
  className,
  style,
  children,
  ...rest
}: CollapseProps) => {
  const [rendered, setRendered] = useState(open);

  // Adjust state during render (React-sanctioned) so children are mounted the
  // moment we open, without an effect.
  if (open && !rendered) setRendered(true);

  const sx = stylex.props(styles.root, open ? styles.open : styles.closed);

  return (
    <div
      {...rest}
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...style }}
      onTransitionEnd={() => {
        if (!open && unmountOnExit) setRendered(false);
      }}
    >
      <div {...stylex.props(styles.inner)}>{!unmountOnExit || rendered ? children : null}</div>
    </div>
  );
};
