import { createContext, useContext } from "react";

export interface TodayMenuIdContextType {
  todayMenuId: string | null;
  setTodayMenuId: (id: string) => void;
}

// Kept in this component-free module so its identity survives Fast Refresh (see
// the note in shared/model/useBottomSheetCTA for the failure this avoids).
export const TodayMenuIdContext = createContext<TodayMenuIdContextType | null>(null);

export const useTodayMenuId = () => {
  const ctx = useContext(TodayMenuIdContext);

  if (ctx == null) {
    throw new Error("TodayMenuIdProvider 안에서만 사용해야 해요.");
  }

  return ctx;
};
