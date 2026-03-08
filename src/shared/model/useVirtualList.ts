import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface VirtualItem<T> {
  item: T;
  index: number;
  offsetTop: number;
}

interface UseVirtualListParams<T> {
  items: T[];
  /** 각 아이템의 고정 높이(px). 가변 높이는 지원하지 않는다. */
  itemHeight: number;
  /** 뷰포트 밖에 미리 렌더링할 아이템 수 (기본값 5) */
  overscan?: number;
}

/**
 * 고정 높이 가상 스크롤 훅. `containerProps`를 스크롤 컨테이너에 spread하고,
 * `virtualItems` 배열만 렌더링하면 된다.
 *
 * @returns `containerRef` — 컨테이너 ref
 * @returns `containerProps` — 스크롤 컨테이너에 spread할 props (ref + onScroll + style)
 * @returns `virtualItems` — 현재 뷰포트에 보이는 아이템 + overscan 목록
 * @returns `totalHeight` — 전체 리스트의 총 높이(px). 스크롤 영역 높이 지정에 사용.
 */
export const useVirtualList = <T>({
  items,
  itemHeight,
  overscan = 5,
}: UseVirtualListParams<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      setContainerHeight(entry.contentRect.height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = containerRef.current;
      if (el) setScrollTop(el.scrollTop);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const totalHeight = items.length * itemHeight;

  const virtualItems = useMemo((): VirtualItem<T>[] => {
    if (containerHeight === 0) return [];

    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / itemHeight) - overscan,
    );
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan,
    );

    const result: VirtualItem<T>[] = [];
    for (let i = startIndex; i <= endIndex; i++) {
      result.push({
        item: items[i],
        index: i,
        offsetTop: i * itemHeight,
      });
    }
    return result;
  }, [items, itemHeight, overscan, scrollTop, containerHeight]);

  return {
    containerRef,
    containerProps: {
      ref: containerRef,
      onScroll: handleScroll,
      style: { overflow: "auto" as const, position: "relative" as const },
    },
    virtualItems,
    totalHeight,
  };
};
