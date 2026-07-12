import type { HTMLAttributes } from "react";
import * as stylex from "@stylexjs/stylex";

interface AnimalCardProps extends HTMLAttributes<HTMLElement> {
  name: string;
  /** Short attribute line, e.g. "2살 · 암컷 · 소형". */
  meta: string;
  /** Owning shelter name. */
  shelter: string;
  /** Status pill text, e.g. "입양가능". Hidden when omitted. */
  status?: string;
  /** Photo URL; falls back to a brand placeholder. */
  imageUrl?: string;
}

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-angel-line)",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "var(--hb-angel-surface)",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
    transform: { default: "none", ":hover": "translateY(-4px)" },
    boxShadow: { default: "none", ":hover": "0 12px 28px rgba(46, 75, 57, 0.1)" },
  },
  photo: {
    position: "relative",
    aspectRatio: "4 / 3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--hb-angel-green-tint)",
    backgroundImage:
      "repeating-linear-gradient(45deg, var(--hb-angel-green-tint), var(--hb-angel-green-tint) 10px, var(--hb-angel-green-tint-strong) 10px, var(--hb-angel-green-tint-strong) 20px)",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    backgroundImage: "none",
  },
  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    paddingBlock: 4,
    paddingInline: 10,
    borderRadius: 999,
    backgroundColor: "var(--hb-angel-green)",
    color: "#ffffff",
    fontSize: "0.6875rem",
    fontWeight: 700,
  },
  paw: { fontSize: "2rem", opacity: 0.55 },
  body: { paddingInline: 16, paddingTop: 14, paddingBottom: 18 },
  name: { margin: 0, fontSize: "1.0625rem", fontWeight: 700, color: "var(--hb-angel-ink)" },
  meta: { margin: 0, marginTop: 6, fontSize: "0.8125rem", color: "var(--hb-angel-ink-soft)" },
  shelter: {
    margin: 0,
    marginTop: 2,
    fontSize: "0.8125rem",
    fontWeight: 600,
    color: "var(--hb-angel-green-dark)",
  },
});

/** A shelter animal preview card — used on the landing, list, and shelter pages. */
export const AnimalCard = ({
  name,
  meta,
  shelter,
  status,
  imageUrl,
  className,
  style,
  ...rest
}: AnimalCardProps) => {
  const sx = stylex.props(styles.root);

  return (
    <article
      {...rest}
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...style }}
    >
      <div {...stylex.props(styles.photo)}>
        {status && <span {...stylex.props(styles.badge)}>{status}</span>}
        {imageUrl ? (
          <img src={imageUrl} alt={name} {...stylex.props(styles.image)} />
        ) : (
          <span {...stylex.props(styles.paw)} aria-hidden="true">
            🐾
          </span>
        )}
      </div>
      <div {...stylex.props(styles.body)}>
        <h3 {...stylex.props(styles.name)}>{name}</h3>
        <p {...stylex.props(styles.meta)}>{meta}</p>
        <p {...stylex.props(styles.shelter)}>{shelter}</p>
      </div>
    </article>
  );
};
