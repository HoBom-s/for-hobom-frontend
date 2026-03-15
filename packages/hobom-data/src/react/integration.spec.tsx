// @vitest-environment happy-dom
import { type ReactNode, Suspense } from "react";
import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HoBom } from "../index";

const createWrapper = (dataLot?: InstanceType<typeof HoBom.DataLot>) => {
  const client = dataLot ?? new HoBom.DataLot();

  function Wrapper({ children }: { children: ReactNode }) {
    return <HoBom.DataLot.Provider client={client}>{children}</HoBom.DataLot.Provider>;
  }

  return { wrapper: Wrapper, client };
};

describe("useQuery", () => {
  it("데이터를 fetch하고 결과를 반환한다", async () => {
    const { wrapper } = createWrapper();

    const { result } = renderHook(
      () =>
        HoBom.DataKernel.useQuery({
          queryKey: ["test"],
          queryFn: () => Promise.resolve("hello"),
        }),
      { wrapper },
    );

    expect(result.current.status).toBe("pending");
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    expect(result.current.data).toBe("hello");
    expect(result.current.isSuccess).toBe(true);
  });

  it("fetch 실패 시 error를 반환한다", async () => {
    const { wrapper } = createWrapper();

    const { result } = renderHook(
      () =>
        HoBom.DataKernel.useQuery({
          queryKey: ["error-test"],
          queryFn: () => Promise.reject(new Error("fail")),
          retry: 0,
        }),
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.status).toBe("error");
    });

    expect(result.current.error?.message).toBe("fail");
    expect(result.current.isError).toBe(true);
  });

  it("enabled: false일 때 fetch하지 않는다", async () => {
    const { wrapper } = createWrapper();
    const queryFn = vi.fn().mockResolvedValue("data");

    const { result } = renderHook(
      () =>
        HoBom.DataKernel.useQuery({
          queryKey: ["disabled"],
          queryFn,
          enabled: false,
        }),
      { wrapper },
    );

    await new Promise((r) => setTimeout(r, 50));

    expect(queryFn).not.toHaveBeenCalled();
    expect(result.current.status).toBe("pending");
  });
});

describe("useDataLot", () => {
  it("Provider 없이 사용하면 에러를 던진다", () => {
    expect(() => {
      renderHook(() => HoBom.DataKernel.useDataLot());
    }).toThrow("useDataLot must be used within a DataLot.Provider");
  });

  it("DataLot 인스턴스를 반환한다", () => {
    const { wrapper, client } = createWrapper();

    const { result } = renderHook(() => HoBom.DataKernel.useDataLot(), {
      wrapper,
    });

    expect(result.current).toBe(client);
  });
});

describe("useSuspenseQuery", () => {
  it("데이터 로딩 완료 후 data를 반환한다", async () => {
    const { wrapper: BaseWrapper } = createWrapper();

    function SuspenseWrapper({ children }: { children: ReactNode }) {
      return (
        <BaseWrapper>
          <Suspense fallback={<div>loading</div>}>{children}</Suspense>
        </BaseWrapper>
      );
    }

    const { result } = renderHook(
      () =>
        HoBom.DataKernel.useSuspenseQuery({
          queryKey: ["suspense-test"],
          queryFn: () => Promise.resolve("suspense-data"),
        }),
      { wrapper: SuspenseWrapper },
    );

    await waitFor(() => {
      expect(result.current.data).toBe("suspense-data");
    });

    expect(result.current.status).toBe("success");
  });

  it("queryKey 변경 시 새 쿼리를 fetch한다 (Suspense)", async () => {
    const { wrapper: BaseWrapper } = createWrapper();

    function SuspenseWrapper({ children }: { children: ReactNode }) {
      return (
        <BaseWrapper>
          <Suspense fallback={<div>loading</div>}>{children}</Suspense>
        </BaseWrapper>
      );
    }

    const { result, rerender } = renderHook(
      ({ id }: { id: string }) =>
        HoBom.DataKernel.useSuspenseQuery({
          queryKey: ["suspense-dynamic", id],
          queryFn: () => Promise.resolve(`data-${id}`),
        }),
      { wrapper: SuspenseWrapper, initialProps: { id: "1" } },
    );

    await waitFor(() => {
      expect(result.current.data).toBe("data-1");
    });

    rerender({ id: "2" });

    await waitFor(() => {
      expect(result.current.data).toBe("data-2");
    });
  });
});

describe("useSuspenseQueries", () => {
  it("여러 쿼리를 병렬로 fetch한다", async () => {
    const { wrapper: BaseWrapper } = createWrapper();

    function SuspenseWrapper({ children }: { children: ReactNode }) {
      return (
        <BaseWrapper>
          <Suspense fallback={<div>loading</div>}>{children}</Suspense>
        </BaseWrapper>
      );
    }

    const { result } = renderHook(
      () =>
        HoBom.DataKernel.useSuspenseQueries({
          queries: [
            {
              queryKey: ["q1"],
              queryFn: () => Promise.resolve("data-1"),
            },
            {
              queryKey: ["q2"],
              queryFn: () => Promise.resolve("data-2"),
            },
          ],
        }),
      { wrapper: SuspenseWrapper },
    );

    await waitFor(() => {
      expect(result.current).toHaveLength(2);
      expect(result.current[0].data).toBe("data-1");
      expect(result.current[1].data).toBe("data-2");
    });
  });
});

describe("useSuspenseQueries dynamic", () => {
  it("queries 배열 변경 시 새 쿼리를 fetch한다", async () => {
    const { wrapper: BaseWrapper } = createWrapper();

    function SuspenseWrapper({ children }: { children: ReactNode }) {
      return (
        <BaseWrapper>
          <Suspense fallback={<div>loading</div>}>{children}</Suspense>
        </BaseWrapper>
      );
    }

    const { result, rerender } = renderHook(
      ({ ids }: { ids: string[] }) =>
        HoBom.DataKernel.useSuspenseQueries({
          queries: ids.map((id) => ({
            queryKey: ["dyn-q", id],
            queryFn: () => Promise.resolve(`data-${id}`),
          })),
        }),
      { wrapper: SuspenseWrapper, initialProps: { ids: ["1", "2"] } },
    );

    await waitFor(() => {
      expect(result.current).toHaveLength(2);
      expect(result.current[0].data).toBe("data-1");
      expect(result.current[1].data).toBe("data-2");
    });

    rerender({ ids: ["1", "3"] });

    await waitFor(() => {
      expect(result.current).toHaveLength(2);
      expect(result.current[0].data).toBe("data-1");
      expect(result.current[1].data).toBe("data-3");
    });
  });
});

describe("useMutation", () => {
  it("mutate 호출 시 mutationFn을 실행한다", async () => {
    const { wrapper } = createWrapper();

    const { result } = renderHook(
      () =>
        HoBom.DataKernel.useMutation({
          mutationFn: async (name: string) => `Hello ${name}`,
        }),
      { wrapper },
    );

    expect(result.current.isIdle).toBe(true);

    act(() => {
      result.current.mutate("World");
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toBe("Hello World");
  });

  it("mutate 실패 시 error 상태가 된다", async () => {
    const { wrapper } = createWrapper();

    const { result } = renderHook(
      () =>
        HoBom.DataKernel.useMutation({
          mutationFn: () => Promise.reject(new Error("mutation-fail")),
        }),
      { wrapper },
    );

    act(() => {
      result.current.mutate(undefined);
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error?.message).toBe("mutation-fail");
  });

  it("onSuccess, onError, onSettled 콜백이 호출된다", async () => {
    const { wrapper } = createWrapper();
    const onSuccess = vi.fn();
    const onSettled = vi.fn();

    const { result } = renderHook(
      () =>
        HoBom.DataKernel.useMutation({
          mutationFn: async (v: string) => v.toUpperCase(),
          onSuccess,
          onSettled,
        }),
      { wrapper },
    );

    act(() => {
      result.current.mutate("test");
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(onSuccess).toHaveBeenCalledWith("TEST", "test", undefined);
    expect(onSettled).toHaveBeenCalled();
  });

  it("reset()이 상태를 초기화한다", async () => {
    const { wrapper } = createWrapper();

    const { result } = renderHook(
      () =>
        HoBom.DataKernel.useMutation({
          mutationFn: async () => "done",
        }),
      { wrapper },
    );

    act(() => {
      result.current.mutate(undefined);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.isIdle).toBe(true);
    expect(result.current.data).toBeUndefined();
  });
});

describe("SWR 동작", () => {
  it("stale 데이터를 즉시 반환하고 background에서 refetch한다", async () => {
    const client = new HoBom.DataLot({
      defaultOptions: { queries: { staleTime: 0 } },
    });
    const { wrapper } = createWrapper(client);

    let fetchCount = 0;
    const queryFn = async () => {
      fetchCount++;

      return `data-${fetchCount}`;
    };

    const { result, unmount } = renderHook(
      () =>
        HoBom.DataKernel.useQuery({
          queryKey: ["swr-test"],
          queryFn,
        }),
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.data).toBe("data-1");
    });

    unmount();

    const { result: result2 } = renderHook(
      () =>
        HoBom.DataKernel.useQuery({
          queryKey: ["swr-test"],
          queryFn,
        }),
      { wrapper },
    );

    expect(result2.current.data).toBe("data-1");

    await waitFor(() => {
      expect(result2.current.data).toBe("data-2");
    });
  });
});

describe("invalidates + mutation", () => {
  it("mutation 후 invalidates로 쿼리를 refetch한다", async () => {
    const client = new HoBom.DataLot();
    const { wrapper } = createWrapper(client);

    let todoCount = 0;
    const queryFn = async () => {
      todoCount++;

      return `todos-${todoCount}`;
    };

    const { result: queryResult } = renderHook(
      () =>
        HoBom.DataKernel.useQuery({
          queryKey: ["todos"],
          queryFn,
        }),
      { wrapper },
    );

    await waitFor(() => {
      expect(queryResult.current.data).toBe("todos-1");
    });

    const { result: mutationResult } = renderHook(
      () =>
        HoBom.DataKernel.useMutation({
          mutationFn: async () => "created",
          onSuccess: async () => {
            await client.invalidates({ queryKey: ["todos"] });
          },
        }),
      { wrapper },
    );

    act(() => {
      mutationResult.current.mutate(undefined);
    });

    await waitFor(() => {
      expect(queryResult.current.data).toBe("todos-2");
    });
  });
});

describe("낙관적 업데이트", () => {
  it("setQueryData로 낙관적 업데이트 후 에러 시 롤백한다", async () => {
    const client = new HoBom.DataLot();
    const cache = client.getQueryCache();

    const query = cache.build({
      queryKey: ["optimistic"],
      queryFn: () => Promise.resolve(["item-1"]),
    });

    query.addObserver();
    await query.fetch();

    expect(client.getQueryData(["optimistic"])).toEqual(["item-1"]);

    let rollbackDone = false;

    const mutation = new (await import("../core/mutation")).Mutation({
      mutationFn: () => Promise.reject(new Error("server-error")),
      onMutate: async () => {
        await client.cancelQueries({ queryKey: ["optimistic"] });
        const previousData = client.getQueryData<string[]>(["optimistic"]) ?? [];

        client.setQueryData<string[]>(["optimistic"], (old) => [...(old ?? []), "item-2"]);

        return { previousData };
      },
      onError: (_err: Error, _vars: void, context: { previousData: string[] } | undefined) => {
        if (context?.previousData) {
          client.setQueryData(["optimistic"], context.previousData);
          rollbackDone = true;
        }
      },
    });

    try {
      await mutation.execute(undefined);
    } catch {
      // expected
    }

    expect(rollbackDone).toBe(true);
    expect(client.getQueryData(["optimistic"])).toEqual(["item-1"]);

    query.removeObserver();
  });

  it("useQuery가 setQueryData 변경을 반영한다", async () => {
    const client = new HoBom.DataLot();
    const { wrapper } = createWrapper(client);

    const { result } = renderHook(
      () =>
        HoBom.DataKernel.useQuery({
          queryKey: ["reflect-test"],
          queryFn: () => Promise.resolve("original"),
        }),
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.data).toBe("original");
    });

    act(() => {
      client.setQueryData(["reflect-test"], "updated");
    });

    await waitFor(() => {
      expect(result.current.data).toBe("updated");
    });
  });
});

describe("useQuery dynamic queryKey", () => {
  it("queryKey 변경 시 새 쿼리를 fetch한다", async () => {
    const { wrapper } = createWrapper();

    const { result, rerender } = renderHook(
      ({ id }: { id: string }) =>
        HoBom.DataKernel.useQuery({
          queryKey: ["item", id],
          queryFn: () => Promise.resolve(`item-${id}`),
        }),
      { wrapper, initialProps: { id: "1" } },
    );

    await waitFor(() => {
      expect(result.current.data).toBe("item-1");
    });

    rerender({ id: "2" });

    await waitFor(() => {
      expect(result.current.data).toBe("item-2");
    });
  });
});

describe("queryOptions / mutationOptions 타입 빌더", () => {
  it("queryOptions가 올바른 객체를 반환한다", () => {
    const options = HoBom.DataLot.queryOptions({
      queryKey: ["test", "1"] as const,
      queryFn: () => Promise.resolve({ id: 1, name: "test" }),
      staleTime: 5000,
    });

    expect(options.queryKey).toEqual(["test", "1"]);
    expect(options.staleTime).toBe(5000);
    expect(typeof options.queryFn).toBe("function");
  });

  it("mutationOptions가 올바른 객체를 반환한다", () => {
    const options = HoBom.DataLot.mutationOptions({
      mutationFn: async (name: string) => ({ id: 1, name }),
    });

    expect(typeof options.mutationFn).toBe("function");
  });
});

describe("refetchOnWindowFocus", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("window focus 시 stale 쿼리를 refetch한다", async () => {
    const client = new HoBom.DataLot({
      defaultOptions: { queries: { staleTime: 0 } },
    });
    const { wrapper } = createWrapper(client);

    let fetchCount = 0;
    const queryFn = async () => {
      fetchCount++;

      return `data-${fetchCount}`;
    };

    const { result } = renderHook(
      () =>
        HoBom.DataKernel.useQuery({
          queryKey: ["focus-test"],
          queryFn,
        }),
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.data).toBe("data-1");
    });

    act(() => {
      window.dispatchEvent(new Event("focus"));
    });

    await waitFor(() => {
      expect(result.current.data).toBe("data-2");
    });
  });

  it("refetchOnWindowFocus: false이면 refetch하지 않는다", async () => {
    const client = new HoBom.DataLot({
      defaultOptions: { queries: { staleTime: 0 } },
    });
    const { wrapper } = createWrapper(client);

    let fetchCount = 0;
    const queryFn = async () => {
      fetchCount++;

      return `data-${fetchCount}`;
    };

    const { result } = renderHook(
      () =>
        HoBom.DataKernel.useQuery({
          queryKey: ["focus-disabled-test"],
          queryFn,
          refetchOnWindowFocus: false,
        }),
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.data).toBe("data-1");
    });

    act(() => {
      window.dispatchEvent(new Event("focus"));
    });

    await new Promise((r) => setTimeout(r, 50));
    expect(result.current.data).toBe("data-1");
  });
});

describe("refetchOnReconnect", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("online 이벤트 시 stale 쿼리를 refetch한다", async () => {
    const client = new HoBom.DataLot({
      defaultOptions: { queries: { staleTime: 0 } },
    });
    const { wrapper } = createWrapper(client);

    let fetchCount = 0;
    const queryFn = async () => {
      fetchCount++;

      return `data-${fetchCount}`;
    };

    const { result } = renderHook(
      () =>
        HoBom.DataKernel.useQuery({
          queryKey: ["reconnect-test"],
          queryFn,
        }),
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.data).toBe("data-1");
    });

    act(() => {
      window.dispatchEvent(new Event("online"));
    });

    await waitFor(() => {
      expect(result.current.data).toBe("data-2");
    });
  });
});

describe("select", () => {
  it("select로 데이터를 변환한다", async () => {
    const { wrapper } = createWrapper();

    const { result } = renderHook(
      () =>
        HoBom.DataKernel.useQuery({
          queryKey: ["select-test"],
          queryFn: () => Promise.resolve([1, 2, 3, 4, 5]),
          select: (data) => data.filter((n) => n > 3),
        }),
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.data).toEqual([4, 5]);
    });
  });
});
