import { type SetStateAction, useCallback, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  createFunnelStateId,
  createFunnelStorage,
  type FunnelStorage,
} from "@/shared/lib";

export const useFunnelState = <T extends Record<string, unknown>>(
  defaultValue: Partial<T>,
  options?: { storage?: FunnelStorage<T> },
) => {
  const location = useLocation();
  const { pathname, search } = location;

  const storage =
    options?.storage ??
    createFunnelStorage<T>(createFunnelStateId(`${pathname}${search}`));

  const persistentStorage = useRef(storage).current;

  const [_state, _setState] = useState<Partial<T>>(defaultValue);

  const setState = useCallback(
    (state: SetStateAction<Partial<T>>) => {
      _setState((prev) => {
        if (typeof state === "function") {
          const newState = state(prev);

          persistentStorage.set(newState);

          return newState;
        }
        persistentStorage.set(state);

        return state;
      });
    },
    [persistentStorage],
  );

  return [_state, setState] as const;
};
