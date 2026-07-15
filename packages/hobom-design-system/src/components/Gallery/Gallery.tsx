import { useState } from "react";
import type { HTMLAttributes } from "react";
import * as stylex from "@stylexjs/stylex";
import { Image } from "../Image/Image";

interface GalleryImage {
  src: string;
  alt?: string;
}

interface GalleryProps extends HTMLAttributes<HTMLDivElement> {
  /** Images to show. The first is selected initially. */
  images: GalleryImage[];
  /** Base label used when an image has no `alt` (e.g. `"콩이 사진 2"`). */
  alt?: string;
  /** CSS aspect-ratio for the main image frame. Defaults to `"4 / 3"`. */
  ratio?: string;
}

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  strip: {
    display: "flex",
    gap: 8,
    overflowX: "auto",
  },
  thumb: {
    flexShrink: 0,
    width: 72,
    padding: 0,
    // Longhand so StyleX reliably strips the browser's default <button> border.
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 8,
    backgroundColor: "transparent",
    cursor: "pointer",
    appearance: "none",
  },
  selected: { borderColor: "var(--hb-color-accent)" },
  unselected: { borderColor: "transparent" },
});

/**
 * A photo gallery: one large main image plus a thumbnail strip to switch it.
 * Generalizes the animal-detail gallery so screens (animal detail, shelter
 * facility photos) reuse the same behavior. Composes {@link Image}.
 */
export const Gallery = ({ images, alt, ratio = "4 / 3", className, style, ...rest }: GalleryProps) => {
  const [index, setIndex] = useState(0);

  // Reset to the first image when the list changes (adjust-state-during-render).
  const [prevImages, setPrevImages] = useState(images);

  if (images !== prevImages) {
    setPrevImages(images);
    setIndex(0);
  }

  const sx = stylex.props(styles.root);
  const clamped = Math.min(index, Math.max(images.length - 1, 0));
  const current = images[clamped];

  return (
    <div
      {...rest}
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...style }}
    >
      <Image
        src={current?.src}
        alt={current?.alt ?? `${alt ?? "사진"} ${clamped + 1}`}
        ratio={ratio}
        priority
        style={{ borderRadius: 12 }}
      />
      {images.length > 1 && (
        <div {...stylex.props(styles.strip)}>
          {images.map((image, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${i + 1}번째 사진 보기`}
              aria-current={i === clamped}
              onClick={() => setIndex(i)}
              {...stylex.props(styles.thumb, i === clamped ? styles.selected : styles.unselected)}
            >
              <Image
                src={image.src}
                alt={image.alt ?? `${alt ?? "사진"} ${i + 1}`}
                ratio="1 / 1"
                style={{ borderRadius: 8 }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
