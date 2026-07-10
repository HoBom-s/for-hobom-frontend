import { useState, type HTMLAttributes, type ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";

type AvatarVariant = "circular" | "rounded" | "square";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** Image source. Falls back to `children` (initials/icon) if absent or it fails to load. */
  src?: string;
  alt?: string;
  /** Shape. Defaults to `"circular"`. */
  variant?: AvatarVariant;
  children?: ReactNode;
}

const styles = stylex.create({
  root: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxSizing: "border-box",
    width: 40,
    height: 40,
    // A neutral grey/white default; consumers usually override via `style`.
    backgroundColor: "#bdbdbd",
    color: "#fff",
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "1.25rem",
    lineHeight: 1,
    overflow: "hidden",
    userSelect: "none",
  },
  circular: { borderRadius: "50%" },
  rounded: { borderRadius: 8 },
  square: { borderRadius: 0 },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    textAlign: "center",
    color: "transparent",
    textIndent: 10000,
  },
});

const VARIANT_STYLE = {
  circular: styles.circular,
  rounded: styles.rounded,
  square: styles.square,
} as const;

export const Avatar = ({
  src,
  alt,
  variant = "circular",
  className,
  style,
  children,
  ...rest
}: AvatarProps) => {
  const [failed, setFailed] = useState(false);
  const showImage = src !== undefined && !failed;
  const sx = stylex.props(styles.root, VARIANT_STYLE[variant]);

  return (
    <div
      {...rest}
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...style }}
    >
      {showImage ? (
        <img {...stylex.props(styles.img)} src={src} alt={alt} onError={() => setFailed(true)} />
      ) : (
        children
      )}
    </div>
  );
};
