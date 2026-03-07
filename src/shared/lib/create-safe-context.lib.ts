import { createContext, useContext } from "react";

export const createSafeContext = <T>(name: string) => {
  const Context = createContext<T | null>(null);

  const useSafeContext = (): T => {
    const ctx = useContext(Context);
    if (!ctx) throw new Error(`${name} must be used within its Provider`);
    return ctx;
  };

  return [Context, useSafeContext] as const;
};
