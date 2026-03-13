import { createContext, useContext } from "react";

/**
 * null-safe한 React Context + Hook 튜플을 생성하는 팩토리.
 *
 * 반환값은 `[Context, useSafeContext]` 튜플이며,
 * `useSafeContext`를 Provider 바깥에서 호출하면 `Error`를 throw한다.
 *
 * @example
 * ```tsx
 * const [MenuCtx, useMenu] = createSafeContext<MenuState>("Menu");
 *
 * // Provider 안에서만 사용 가능
 * const menu = useMenu(); // Provider 밖이면 throw
 * ```
 */
export const createSafeContext = <T>(name: string) => {
  const Context = createContext<T | null>(null);

  const useSafeContext = (): T => {
    const ctx = useContext(Context);

    if (!ctx) throw new Error(`${name} must be used within its Provider`);

    return ctx;
  };

  return [Context, useSafeContext] as const;
};
