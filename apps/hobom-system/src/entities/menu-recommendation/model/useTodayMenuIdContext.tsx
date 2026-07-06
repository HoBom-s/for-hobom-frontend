import { createContext, type ReactNode, useContext, useState } from "react";

interface TodayMenuIdContextType {
  todayMenuId: string | null;
  setTodayMenuId: (id: string) => void;
}

const TodayMenuIdContext = createContext<TodayMenuIdContextType | null>(null);

export const TodayMenuIdContextProvider = ({ children }: { children: ReactNode }) => {
  const [todayMenuId, setTodayMenuId] = useState<string | null>(null);

  return (
    <TodayMenuIdContext.Provider value={{ todayMenuId, setTodayMenuId }}>
      {children}
    </TodayMenuIdContext.Provider>
  );
};

// Context, provider, and hook are intentionally colocated; Fast Refresh is an
// HMR heuristic that doesn't apply to this consumer hook export.
// eslint-disable-next-line react-refresh/only-export-components
export const useTodayMenuId = () => {
  const ctx = useContext(TodayMenuIdContext);

  if (ctx == null) {
    throw new Error("TodayMenuIdProvider 안에서만 사용해야 해요.");
  }

  return ctx;
};
