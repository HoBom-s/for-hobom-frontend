import {
  Fragment,
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface OverlayContextProps {
  created: (cId: string, elem: ReactNode) => void;
  unmount: (cId: string) => void;
}

type OverlayContextState<K, V> = Map<K, V>;

interface OverlayProviderProps {
  children: ReactNode;
}

export const OverlayContext = createContext<OverlayContextProps | null>(null);

export const OverlayProvider = ({ children }: OverlayProviderProps) => {
  const [cIds, setCIds] = useState<OverlayContextState<string, ReactNode>>(
    new Map(),
  );

  const created = useCallback((cId: string, elem: ReactNode) => {
    setCIds((prev: OverlayContextState<string, ReactNode>) => {
      const prevMap = new Map(prev);

      prevMap.set(cId, elem);

      return prevMap;
    });
  }, []);

  const unmount = useCallback((cId: string) => {
    setCIds((prev: OverlayContextState<string, ReactNode>) => {
      const prevMap = new Map(prev);

      prevMap.delete(cId);

      return prevMap;
    });
  }, []);

  const overlayMenu = useMemo(() => {
    return {
      created,
      unmount,
    };
  }, [created, unmount]);

  return (
    <OverlayContext.Provider value={overlayMenu}>
      {children}
      {[...cIds.entries()].map(([cId, child]) => {
        return <Fragment key={cId}>{child}</Fragment>;
      })}
    </OverlayContext.Provider>
  );
};
