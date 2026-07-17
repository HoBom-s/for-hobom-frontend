import { Children, useRef, useState } from "react";
import type { PointerEvent, ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  root: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    touchAction: "pan-y",
    userSelect: "none",
  },
  track: {
    display: "flex",
    transitionProperty: "transform",
    transitionDuration: "0.35s",
    transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
  },
  slide: { flex: "0 0 100%", minWidth: 0 },
  arrow: {
    position: "absolute",
    insetBlockStart: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    padding: 0,
    borderWidth: 0,
    borderStyle: "none",
    borderRadius: 999,
    cursor: "pointer",
    color: "#111",
    backgroundColor: { default: "rgba(255, 255, 255, 0.85)", ":hover": "#fff" },
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
    fontSize: "1.1rem",
    lineHeight: 1,
  },
  prev: { insetInlineStart: 8 },
  next: { insetInlineEnd: 8 },
  counter: {
    position: "absolute",
    insetBlockStart: 8,
    insetInlineEnd: 8,
    paddingBlock: 2,
    paddingInline: 8,
    borderRadius: 999,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    color: "#fff",
    fontSize: "0.75rem",
    fontWeight: 600,
  },
  dots: {
    position: "absolute",
    insetBlockEnd: 10,
    insetInlineStart: 0,
    insetInlineEnd: 0,
    display: "flex",
    justifyContent: "center",
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    padding: 0,
    borderWidth: 0,
    borderStyle: "none",
    cursor: "pointer",
    backgroundColor: "rgba(255, 255, 255, 0.55)",
    transitionProperty: "width, background-color",
    transitionDuration: "0.2s",
  },
  dotActive: { width: 16, backgroundColor: "#fff" },
});

const SWIPE_THRESHOLD = 48;

interface CarouselProps {
  children: ReactNode;
  /** Show the prev/next arrows. Off by default — swipe and dots navigate. */
  arrows?: boolean;
  /** Accessible label for the region. */
  "aria-label"?: string;
}

/** A swipeable, animated horizontal carousel. Each child is one full-width
 *  slide; drag/swipe or use the dots (and optional arrows) to navigate. */
export const Carousel = ({ children, arrows = false, "aria-label": ariaLabel }: CarouselProps) => {
  const slides = Children.toArray(children);
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const startX = useRef<number | null>(null);

  const last = slides.length - 1;
  const clamp = (value: number) => Math.max(0, Math.min(last, value));
  // Stop the nav controls from bubbling — a carousel is often wrapped in a
  // clickable container (e.g. open-on-click), and arrows/dots shouldn't trigger it.
  const go = (next: number, event?: { stopPropagation: () => void }) => {
    event?.stopPropagation();
    setIndex(clamp(next));
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    startX.current = event.clientX;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (startX.current !== null) setDrag(event.clientX - startX.current);
  };

  const onPointerUp = () => {
    if (Math.abs(drag) > SWIPE_THRESHOLD) go(index + (drag < 0 ? 1 : -1));
    startX.current = null;
    setDrag(0);
  };

  if (slides.length <= 1) return <>{children}</>;

  return (
    <div {...stylex.props(styles.root)} role="region" aria-label={ariaLabel} aria-roledescription="carousel">
      <div
        {...stylex.props(styles.track)}
        style={{
          transform: `translateX(calc(${-index * 100}% + ${drag}px))`,
          transition: startX.current !== null ? "none" : undefined,
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDragStart={(event) => event.preventDefault()}
      >
        {slides.map((slide, i) => (
          <div key={i} {...stylex.props(styles.slide)}>
            {slide}
          </div>
        ))}
      </div>

      <div {...stylex.props(styles.counter)} aria-hidden="true">
        {index + 1}/{slides.length}
      </div>

      {arrows && index > 0 && (
        <button
          type="button"
          aria-label="이전"
          {...stylex.props(styles.arrow, styles.prev)}
          onClick={(event) => go(index - 1, event)}
        >
          ‹
        </button>
      )}
      {arrows && index < last && (
        <button
          type="button"
          aria-label="다음"
          {...stylex.props(styles.arrow, styles.next)}
          onClick={(event) => go(index + 1, event)}
        >
          ›
        </button>
      )}

      <div {...stylex.props(styles.dots)}>
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`${i + 1}번째로 이동`}
            {...stylex.props(styles.dot, i === index && styles.dotActive)}
            onClick={(event) => go(i, event)}
          />
        ))}
      </div>
    </div>
  );
};
