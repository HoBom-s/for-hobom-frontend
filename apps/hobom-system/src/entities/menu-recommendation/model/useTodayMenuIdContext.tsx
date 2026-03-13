import { createContext, type ReactNode, useContext, useState } from "react";

interface TodayMenuIdContextType {
  todayMenuId: string | null;
  setTodayMenuId: (id: string) => void;
}

const TodayMenuIdContext = createContext<TodayMenuIdContextType | null>(null);

export const TodayMenuIdContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [todayMenuId, setTodayMenuId] = useState<string | null>(null);

  return (
    <TodayMenuIdContext.Provider value={{ todayMenuId, setTodayMenuId }}>
      {children}
    </TodayMenuIdContext.Provider>
  );
};

export const useTodayMenuId = () => {
  const ctx = useContext(TodayMenuIdContext);

  if (ctx == null) {
    throw new Error("TodayMenuIdProvider 안에서만 사용해야 해요.");
  }

  return ctx;
};
