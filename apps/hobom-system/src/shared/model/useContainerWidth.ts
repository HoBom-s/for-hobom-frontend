import { useEffect, useRef, useState } from "react";

export const useContainerWidth = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return [ref, width] as const;
};
