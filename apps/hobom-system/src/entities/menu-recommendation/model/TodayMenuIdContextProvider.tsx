import { useState, type ReactNode } from "react";
import { TodayMenuIdContext } from "./useTodayMenuIdContext";

export const TodayMenuIdContextProvider = ({ children }: { children: ReactNode }) => {
  const [todayMenuId, setTodayMenuId] = useState<string | null>(null);

  return (
    <TodayMenuIdContext.Provider value={{ todayMenuId, setTodayMenuId }}>
      {children}
    </TodayMenuIdContext.Provider>
  );
};
