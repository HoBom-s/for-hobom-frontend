import { useCallback, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";

const shimmer = stylex.keyframes({
  "0%": { backgroundPosition: "-420px 0" },
  "100%": { backgroundPosition: "420px 0" },
});

const styles = stylex.create({
  frame: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--hb-color-canvas)",
  },
  // Shimmer shown only while a real image is still decoding.
  loading: {
    backgroundImage:
      "linear-gradient(90deg, oklch(0.945 0.005 80) 25%, oklch(0.978 0.004 80) 37%, oklch(0.945 0.005 80) 63%)",
    backgroundSize: "840px 100%",
    animationName: shimmer,
    animationDuration: "1.5s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
  },
  image: {
    width: "100%",
    height: "100%",
    display: "block",
    // Fade in once decoded, instead of popping over the shimmer.
    opacity: 0,
    transitionProperty: "opacity",
    transitionDuration: "0.4s",
    transitionTimingFunction: "ease",
  },
  loaded: { opacity: 1 },
  cover: { objectFit: "cover" },
  contain: { objectFit: "contain" },
});

type Status = "loading" | "loaded" | "error";

interface ImageProps {
  src?: string;
  alt: string;
  /** CSS aspect-ratio for the frame (e.g. "16 / 9"). Reserves space to avoid
   *  layout shift. Defaults to "1 / 1". */
  ratio?: string;
  /** Load eagerly with high priority (e.g. an above-the-fold LCP image). */
  priority?: boolean;
  objectFit?: "cover" | "contain";
  /** Rendered when there is no `src` or the image fails to load. */
  fallback?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Responsive image with a reserved aspect-ratio frame (no layout shift), a
 * shimmer placeholder that fades into the decoded image, lazy + async decoding,
 * priority hints, and a fallback slot for the empty/error state.
 */
export const Image = ({
  src,
  alt,
  ratio = "1 / 1",
  priority = false,
  objectFit = "cover",
  fallback,
  className,
  style,
}: ImageProps) => {
  const [status, setStatus] = useState<Status>("loading");

  // Reset when the src changes (adjust-state-during-render, no effect needed).
  const [prevSrc, setPrevSrc] = useState(src);

  if (src !== prevSrc) {
    setPrevSrc(src);
    setStatus("loading");
  }

  // A cached image can finish before React attaches `onLoad`; catch it on mount.
  // Keyed by `src`, so the element remounts (and re-checks) on a swap.
  const checkCached = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth > 0) setStatus("loaded");
  }, []);

  const showImage = Boolean(src) && status !== "error";
  const frame = stylex.props(styles.frame, showImage && status !== "loaded" && styles.loading);

  return (
    <div
      className={[frame.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...frame.style, aspectRatio: ratio, ...style }}
    >
      {showImage ? (
        <img
          key={src}
          ref={checkCached}
          src={src}
          alt={alt}
          {...stylex.props(
            styles.image,
            status === "loaded" && styles.loaded,
            objectFit === "contain" ? styles.contain : styles.cover,
          )}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
        />
      ) : (
        fallback
      )}
    </div>
  );
};
