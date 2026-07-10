import { useEffect, useRef, useState } from "react";

/** Tracks a container's pixel width via ResizeObserver, for responsive charts. */
export const useMeasure = (): [React.RefObject<HTMLDivElement | null>, number] => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const next = entries[0]?.contentRect.width ?? 0;

      setWidth(next);
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [ref, width];
};
