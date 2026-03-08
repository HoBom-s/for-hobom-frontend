import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { DailyTodoType } from "../api/daily-todo.type";

const mutateFnMock = vi.fn();
const cancelQueriesMock = vi.fn();
const getQueryDataMock = vi.fn();
const setQueryDataMock = vi.fn();
const invalidateQueriesMock = vi.fn();
const openSuccessToastMock = vi.fn();
const openErrorToastMock = vi.fn();

vi.mock("@tanstack/react-query", () => ({
  useMutation: (opts: Record<string, unknown>) => {
    const wrappedMutate = (...args: unknown[]) => mutateFnMock(opts, ...args);
    return { mutate: wrappedMutate, _opts: opts };
  },
  useQueryClient: () => ({
    cancelQueries: cancelQueriesMock,
    getQueryData: getQueryDataMock,
    setQueryData: setQueryDataMock,
    invalidateQueries: invalidateQueriesMock,
  }),
}));

vi.mock("@/shared/model", () => ({
  useToast: () => ({
    openSuccessToast: openSuccessToastMock,
    openErrorToast: openErrorToastMock,
  }),
}));

vi.mock("@/packages/bom", () => {
  const prop = (obj: Record<string, unknown>, key: string) => obj[key];
  const isNullish = (v: unknown) => v == null;
  const pipe = (...args: unknown[]) => {
    const [initial, ...fns] = args;
    return (fns as Array<(v: unknown) => unknown>).reduce(
      (acc, fn) => fn(acc),
      initial,
    );
  };
  return { Bom: { pipe, prop, isNullish } };
});

vi.mock("@/entities/daily-todo", () => ({
  todoQueries: {
    byDate: (date: string) => ({
      queryKey: ["todos", "by-date", date],
    }),
  },
  normalizeTodoDateToUtcMidnight: (d: string) => d,
  formatDate: (d: string) => d,
}));

vi.mock("../api/daily-todo.mutations", () => ({
  todoMutations: {
    changeCompleteStatus: () => ({
      mutationKey: ["todos", "changeCompleteStatus"],
      mutationFn: vi.fn(),
    }),
  },
}));

const { useChangeDailyTodoCompleteStatus } = await import(
  "./useChangeDailyTodoCompleteStatus"
);

const makeTodo = (overrides: Partial<DailyTodoType> = {}): DailyTodoType =>
  ({
    id: "todo-1",
    title: "테스트 할일",
    date: "2026-03-08",
    reaction: null,
    progress: "NOT_STARTED",
    cycle: "DAILY",
    owner: { id: "user-1", username: "test", nickname: "테스트" },
    category: { id: "cat-1", title: "기본", ownerId: "user-1" },
    ...overrides,
  }) as DailyTodoType;

describe("useChangeDailyTodoCompleteStatus", () => {
  beforeEach(() => {
    mutateFnMock.mockReset();
    cancelQueriesMock.mockReset();
    getQueryDataMock.mockReset();
    setQueryDataMock.mockReset();
    invalidateQueriesMock.mockReset();
    openSuccessToastMock.mockReset();
    openErrorToastMock.mockReset();
  });

  describe("onMutate (optimistic update)", () => {
    it("이전 데이터를 저장하고 캐시를 업데이트한다", async () => {
      const todo = makeTodo();
      const { result } = renderHook(() =>
        useChangeDailyTodoCompleteStatus(todo),
      );
      const opts = result.current._opts;

      const previous = { items: [makeTodo()] };
      getQueryDataMock.mockReturnValue(previous);
      cancelQueriesMock.mockResolvedValue(undefined);

      const ctx = await opts.onMutate({ status: "DONE" });

      expect(cancelQueriesMock).toHaveBeenCalled();
      expect(ctx).toEqual({ previousData: previous });
    });

    it("캐시의 progress를 새 status로 업데이트한다", async () => {
      const todo = makeTodo({ id: "todo-1", progress: "NOT_STARTED" });
      const { result } = renderHook(() =>
        useChangeDailyTodoCompleteStatus(todo),
      );
      const opts = result.current._opts;

      cancelQueriesMock.mockResolvedValue(undefined);
      getQueryDataMock.mockReturnValue({
        items: [makeTodo({ id: "todo-1", progress: "NOT_STARTED" })],
      });

      await opts.onMutate({ status: "DONE" });

      const updater = setQueryDataMock.mock.calls[0][1];
      const updated = updater({
        items: [makeTodo({ id: "todo-1", progress: "NOT_STARTED" })],
      });
      expect(updated.items[0].progress).toBe("DONE");
    });

    it("old가 null이면 캐시를 변경하지 않는다", async () => {
      const todo = makeTodo();
      const { result } = renderHook(() =>
        useChangeDailyTodoCompleteStatus(todo),
      );
      const opts = result.current._opts;

      cancelQueriesMock.mockResolvedValue(undefined);
      getQueryDataMock.mockReturnValue(null);

      await opts.onMutate({ status: "DONE" });

      const updater = setQueryDataMock.mock.calls[0][1];
      expect(updater(null)).toBeUndefined();
    });
  });

  describe("onError (rollback)", () => {
    it("이전 데이터로 롤백하고 에러 토스트를 표시한다", () => {
      const todo = makeTodo();
      const { result } = renderHook(() =>
        useChangeDailyTodoCompleteStatus(todo),
      );
      const opts = result.current._opts;
      const previousData = { items: [makeTodo()] };

      opts.onError(new Error("fail"), {}, { previousData });

      expect(setQueryDataMock).toHaveBeenCalled();
      expect(openErrorToastMock).toHaveBeenCalledWith({
        message: "상태를 변경하지 못했어요.",
      });
    });
  });

  describe("onSuccess", () => {
    it("성공 토스트를 표시한다", () => {
      const todo = makeTodo();
      const { result } = renderHook(() =>
        useChangeDailyTodoCompleteStatus(todo),
      );
      const opts = result.current._opts;

      opts.onSuccess();

      expect(openSuccessToastMock).toHaveBeenCalledWith({
        message: "상태를 변경했어요.",
      });
    });
  });

  describe("onSettled", () => {
    it("쿼리를 invalidate한다", async () => {
      const todo = makeTodo();
      const { result } = renderHook(() =>
        useChangeDailyTodoCompleteStatus(todo),
      );
      const opts = result.current._opts;

      await opts.onSettled();

      expect(invalidateQueriesMock).toHaveBeenCalled();
    });
  });
});
