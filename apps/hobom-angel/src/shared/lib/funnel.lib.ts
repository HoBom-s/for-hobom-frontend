type FunnelStateId = `funnel-state-id__${string}`;

const FUNNEL_STATE_ID = `funnel-state-id__`;

export interface FunnelStorage<T> {
  get: () => Promise<Partial<T> | null>;
  set: (value: Partial<T>) => Promise<void>;
  clear: () => Promise<void>;
}

/** Builds a unique storage key for `useFunnel`, prefixed with `funnel-state-id__`. */
export const createFunnelStateId = (id: string): FunnelStateId => {
  return `${FUNNEL_STATE_ID}${id}`;
};

/**
 * Creates storage that persists multi-step (funnel) form state.
 * Defaults to `sessionStorage`, which clears itself when the tab closes.
 * On a JSON parse failure it removes the key and returns `null`.
 */
export const createFunnelStorage = <T>(
  funnelStateId: FunnelStateId,
  storageType = "sessionStorage",
): FunnelStorage<T> => {
  switch (storageType) {
    case "sessionStorage":
      return {
        get: () => {
          const d = sessionStorage.getItem(funnelStateId);

          if (d === null) {
            return Promise.resolve(null);
          }

          try {
            return Promise.resolve(JSON.parse(d) as Partial<T>);
          } catch {
            sessionStorage.removeItem(funnelStateId);

            return Promise.resolve(null);
          }
        },
        set: (value: Partial<T>) => {
          sessionStorage.setItem(funnelStateId, JSON.stringify(value));

          return Promise.resolve();
        },
        clear: () => {
          sessionStorage.removeItem(funnelStateId);

          return Promise.resolve();
        },
      };

    default:
      throw new Error("Please check your funnel storage type");
  }
};
