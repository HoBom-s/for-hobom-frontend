type FunnelStateId = `funnel-state-id__${string}`;

const FUNNEL_STATE_ID = `funnel-state-id__`;

export interface FunnelStorage<T> {
  get: () => Promise<Partial<T> | null>;
  set: (value: Partial<T>) => Promise<void>;
  clear: () => Promise<void>;
}

export const createFunnelStateId = (id: string): FunnelStateId => {
  return `${FUNNEL_STATE_ID}${id}`;
};

export const createFunnelStorage = <T>(
  funnelStateId: FunnelStateId,
  storageType = "sessionStorage",
): FunnelStorage<T> => {
  switch (storageType) {
    case "sessionStorage":
      return {
        get: async () => {
          const d = sessionStorage.getItem(funnelStateId);

          if (d === null) {
            return null;
          }

          return JSON.parse(d) as Partial<T>;
        },
        set: async (value: Partial<T>) => {
          sessionStorage.setItem(funnelStateId, JSON.stringify(value));
        },
        clear: async () => {
          sessionStorage.removeItem(funnelStateId);
        },
      };

    default:
      throw new Error("Please check your funnel storage type");
  }
};
