import { describe, expect, it } from "vitest";
import { DataLot } from "./data-lot";

describe("DataLot", () => {
  it("기본 옵션으로 생성된다", () => {
    const lot = new DataLot();

    expect(lot.getDefaultOptions()).toEqual({});
  });

  it("커스텀 기본 옵션으로 생성된다", () => {
    const lot = new DataLot({
      defaultOptions: { queries: { staleTime: 5000 } },
    });

    expect(lot.getDefaultOptions().queries?.staleTime).toBe(5000);
  });

  it("getQueryData/setQueryData로 캐시 데이터를 조작한다", () => {
    const lot = new DataLot();
    const cache = lot.getQueryCache();

    cache.build({
      queryKey: ["test"],
      queryFn: () => Promise.resolve("data"),
    });

    lot.setQueryData(["test"], "hello");
    expect(lot.getQueryData(["test"])).toBe("hello");
  });

  it("setQueryData에 updater 함수를 전달한다", () => {
    const lot = new DataLot();
    const cache = lot.getQueryCache();

    cache.build({
      queryKey: ["count"],
      queryFn: () => Promise.resolve(0),
    });

    lot.setQueryData(["count"], 10);
    lot.setQueryData<number>(["count"], (old) => (old ?? 0) + 1);

    expect(lot.getQueryData(["count"])).toBe(11);
  });

  it("invalidates가 active query를 refetch한다", async () => {
    const lot = new DataLot();
    const cache = lot.getQueryCache();
    let fetchCount = 0;

    const query = cache.build({
      queryKey: ["todos"],
      queryFn: async () => {
        fetchCount++;

        return `data-${fetchCount}`;
      },
    });

    query.addObserver();
    await query.fetch();
    expect(fetchCount).toBe(1);

    await lot.invalidates({ queryKey: ["todos"] });
    expect(fetchCount).toBe(2);

    query.removeObserver();
  });

  it("cancelQueries가 진행 중인 fetch를 취소한다", async () => {
    const lot = new DataLot();
    const cache = lot.getQueryCache();

    const query = cache.build({
      queryKey: ["cancel-test"],
      queryFn: ({ signal }) =>
        new Promise((_, reject) => {
          signal.addEventListener("abort", () => reject(new Error("aborted")));
        }),
    });

    const promise = query.fetch();

    await lot.cancelQueries({ queryKey: ["cancel-test"] });

    await expect(promise).rejects.toThrow("aborted");
    expect(query.getState().fetchStatus).toBe("idle");
  });

  it("setQueryData가 존재하지 않는 키에도 동작한다", () => {
    const lot = new DataLot();

    lot.setQueryData(["new-key"], "new-value");
    expect(lot.getQueryData(["new-key"])).toBe("new-value");
  });

  it("invalidates가 기존 fetch를 취소하고 refetch한다", async () => {
    const lot = new DataLot();
    const cache = lot.getQueryCache();
    let fetchCount = 0;

    const query = cache.build({
      queryKey: ["cancel-refetch"],
      queryFn: async () => {
        fetchCount++;

        return `data-${fetchCount}`;
      },
    });

    query.addObserver();
    await query.fetch();
    expect(fetchCount).toBe(1);

    // Start a new fetch that will be deduped without cancel
    const fetchPromise = query.fetch();

    // invalidates should cancel the existing fetch and start a new one
    await lot.invalidates({ queryKey: ["cancel-refetch"] });
    await fetchPromise.catch(() => undefined);

    expect(fetchCount).toBeGreaterThanOrEqual(2);

    query.removeObserver();
  });

  it("clear가 모든 캐시를 제거한다", () => {
    const lot = new DataLot();
    const cache = lot.getQueryCache();

    cache.build({
      queryKey: ["a"],
      queryFn: () => Promise.resolve(1),
    });
    cache.build({
      queryKey: ["b"],
      queryFn: () => Promise.resolve(2),
    });

    expect(cache.getSize()).toBe(2);
    lot.clear();
    expect(cache.getSize()).toBe(0);
  });
});
