type FunnelStateId = `funnel-state-id__${string}`;

const FUNNEL_STATE_ID = `funnel-state-id__`;

export interface FunnelStorage<T> {
  get: () => Promise<Partial<T> | null>;
  set: (value: Partial<T>) => Promise<void>;
  clear: () => Promise<void>;
}

/** `useFunnel`에서 사용할 고유 스토리지 키를 생성한다. `funnel-state-id__` 접두어가 붙는다. */
export const createFunnelStateId = (id: string): FunnelStateId => {
  return `${FUNNEL_STATE_ID}${id}`;
};

/**
 * 멀티스텝 폼(퍼널) 상태를 영속화하는 스토리지를 생성한다.
 * 기본값은 `sessionStorage`이며, 탭 종료 시 자동 정리된다.
 * JSON 파싱 실패 시 해당 키를 제거하고 `null`을 반환한다.
 */
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

          try {
            return JSON.parse(d) as Partial<T>;
          } catch {
            sessionStorage.removeItem(funnelStateId);
            return null;
          }
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
