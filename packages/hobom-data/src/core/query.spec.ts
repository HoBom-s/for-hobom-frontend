import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Query } from "./query";

const createQuery = <T>(
  overrides: Partial<{
    queryKey: readonly unknown[];
    queryFn: (ctx: { signal: AbortSignal }) => Promise<T>;
    staleTime: number;
    gcTime: number;
    retry: number | false;
    retryDelay: number | ((attempt: number) => number);
  }> = {},
) => {
  const queryFn = overrides.queryFn ?? (() => Promise.resolve("data" as T));

  return new Query("test-hash", {
    queryKey: overrides.queryKey ?? ["test"],
    queryFn,
    staleTime: overrides.staleTime,
    gcTime: overrides.gcTime,
    retry: overrides.retry,
    retryDelay: overrides.retryDelay,
  });
};

describe("Query", () => {
  it("초기 상태가 pending/idle이다", () => {
    const query = createQuery();
    const state = query.getState();

    expect(state.status).toBe("pending");
    expect(state.fetchStatus).toBe("idle");
    expect(state.data).toBeUndefined();
    expect(state.error).toBeNull();
  });

  it("fetch 성공 시 status가 success가 된다", async () => {
    const query = createQuery({ queryFn: () => Promise.resolve("hello") });

    await query.fetch();
    const state = query.getState();

    expect(state.status).toBe("success");
    expect(state.data).toBe("hello");
    expect(state.fetchStatus).toBe("idle");
    expect(state.dataUpdatedAt).toBeGreaterThan(0);
  });

  it("fetch 실패 시 status가 error가 된다", async () => {
    const error = new Error("fail");
    const query = createQuery({
      queryFn: () => Promise.reject(error),
      retry: 0,
    });

    await expect(query.fetch()).rejects.toThrow("fail");

    const state = query.getState();

    expect(state.status).toBe("error");
    expect(state.error).toBe(error);
  });

  it("동시 fetch 호출 시 promise를 재사용한다 (dedup)", async () => {
    let callCount = 0;
    const query = createQuery({
      queryFn: async () => {
        callCount++;

        return "data";
      },
    });

    const [r1, r2] = await Promise.all([query.fetch(), query.fetch()]);

    expect(callCount).toBe(1);
    expect(r1).toBe("data");
    expect(r2).toBe("data");
  });

  describe("staleTime", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it("staleTime이 지나면 stale 상태가 된다", async () => {
      const query = createQuery({ staleTime: 100 });

      await query.fetch();

      expect(query.isStale()).toBe(false);

      vi.advanceTimersByTime(101);
      expect(query.isStale()).toBe(true);
    });
  });

  it("cancel()이 AbortController를 abort한다", async () => {
    let receivedSignal: AbortSignal | null = null;

    const query = createQuery({
      queryFn: ({ signal }) => {
        receivedSignal = signal;

        return new Promise((_, reject) => {
          signal.addEventListener("abort", () => reject(new Error("aborted")));
        });
      },
    });

    const promise = query.fetch();

    query.cancel();

    expect(receivedSignal!.aborted).toBe(true);
    await expect(promise).rejects.toThrow("aborted");
  });

  it("setData()로 데이터를 직접 설정한다", () => {
    const query = createQuery();

    query.setData("manual");

    const state = query.getState();

    expect(state.status).toBe("success");
    expect(state.data).toBe("manual");
    expect(state.dataUpdatedAt).toBeGreaterThan(0);
  });

  it("observer count를 관리한다", () => {
    const query = createQuery();

    expect(query.getObserverCount()).toBe(0);
    query.addObserver();
    expect(query.getObserverCount()).toBe(1);
    query.removeObserver();
    expect(query.getObserverCount()).toBe(0);
  });

  it("removeObserver를 중복 호출해도 음수가 되지 않는다", () => {
    const query = createQuery();

    query.addObserver();
    query.removeObserver();
    query.removeObserver();

    expect(query.getObserverCount()).toBe(0);
  });

  describe("retry", () => {
    it("실패 후 재시도하여 성공한다", async () => {
      let callCount = 0;
      const query = createQuery({
        queryFn: async () => {
          callCount++;
          if (callCount < 3) throw new Error("transient");

          return "ok";
        },
        retry: 3,
        retryDelay: 0,
      });

      const data = await query.fetch();

      expect(data).toBe("ok");
      expect(callCount).toBe(3);
      expect(query.getState().status).toBe("success");
    });

    it("모든 재시도 실패 시 error 상태가 된다", async () => {
      let callCount = 0;
      const query = createQuery({
        queryFn: async () => {
          callCount++;
          throw new Error("always-fail");
        },
        retry: 2,
        retryDelay: 0,
      });

      await expect(query.fetch()).rejects.toThrow("always-fail");
      expect(callCount).toBe(3); // 1 initial + 2 retries
      expect(query.getState().status).toBe("error");
    });

    it("retry: false이면 재시도하지 않는다", async () => {
      let callCount = 0;
      const query = createQuery({
        queryFn: async () => {
          callCount++;
          throw new Error("fail");
        },
        retry: false,
        retryDelay: 0,
      });

      await expect(query.fetch()).rejects.toThrow("fail");
      expect(callCount).toBe(1);
    });

    it("abort 시 retry를 중단한다", async () => {
      let callCount = 0;
      const query = createQuery({
        queryFn: async ({ signal }) => {
          callCount++;
          if (callCount === 1) throw new Error("transient");

          return new Promise<string>((_, reject) => {
            signal.addEventListener("abort", () => reject(new Error("aborted")));
          });
        },
        retry: 3,
        retryDelay: 0,
      });

      const promise = query.fetch();

      // 첫 번째 시도 실패 → retryDelay 0 → 두 번째 시도 진입 → abort
      await new Promise((r) => setTimeout(r, 10));
      query.cancel();

      await expect(promise).rejects.toThrow("aborted");
      expect(query.getState().fetchStatus).toBe("idle");
    });

    it("custom retryDelay 함수를 사용한다", async () => {
      const delays: number[] = [];
      let callCount = 0;

      const query = createQuery({
        queryFn: async () => {
          callCount++;
          if (callCount <= 2) throw new Error("fail");

          return "ok";
        },
        retry: 2,
        retryDelay: (attempt) => {
          delays.push(attempt);

          return 0;
        },
      });

      await query.fetch();

      expect(delays).toEqual([0, 1]);
      expect(callCount).toBe(3);
    });
  });

  describe("structural sharing", () => {
    it("동일한 데이터를 반환하면 이전 참조를 유지한다", async () => {
      let callCount = 0;
      const query = createQuery({
        queryFn: async () => {
          callCount++;

          return { items: [{ id: 1 }, { id: 2 }], total: 2 };
        },
        staleTime: 0,
      });

      await query.fetch();
      const firstData = query.getState().data;

      // 두 번째 fetch — 동일한 구조의 데이터 반환
      await query.fetch();
      const secondData = query.getState().data;

      expect(callCount).toBe(2);
      expect(secondData).toBe(firstData); // 참조 동일
    });

    it("데이터 일부가 변경되면 변경된 부분만 새 참조", async () => {
      let done = false;
      const query = createQuery({
        queryFn: async () => ({
          items: [
            { id: 1, name: "a" },
            { id: 2, name: done ? "changed" : "b" },
          ],
        }),
        staleTime: 0,
      });

      await query.fetch();
      const firstItems = (query.getState().data as { items: { id: number; name: string }[] }).items;
      const firstItem0 = firstItems[0];

      done = true;
      await query.fetch();
      const secondItems = (query.getState().data as { items: { id: number; name: string }[] })
        .items;

      expect(secondItems).not.toBe(firstItems); // 배열 자체는 변경
      expect(secondItems[0]).toBe(firstItem0); // 첫 번째 아이템은 동일 → 참조 유지
      expect(secondItems[1]).not.toBe(firstItems[1]); // 두 번째 아이템은 변경
    });
  });

  it("상태 변경 시 리스너에 알린다", async () => {
    const listener = vi.fn();
    const query = createQuery();

    query.subscribe(listener);

    await query.fetch();

    expect(listener.mock.calls.length).toBeGreaterThanOrEqual(2);
  });
});
