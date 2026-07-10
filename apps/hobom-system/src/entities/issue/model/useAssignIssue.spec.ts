// @vitest-environment happy-dom
import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { HttpResponseType } from "@/shared/api";
import type { IssueType } from "../api/issue.type";

const mutateFnMock = vi.fn();
const cancelQueriesMock = vi.fn();
const getQueryDataMock = vi.fn();
const setQueryDataMock = vi.fn();
const invalidateQueriesMock = vi.fn();
const openErrorToastMock = vi.fn();

vi.mock("hobom-data", () => ({
  useMutation: (opts: Record<string, unknown>) => {
    const wrappedMutate = (...args: unknown[]) => mutateFnMock(opts, ...args);

    return { mutate: wrappedMutate, _opts: opts };
  },
  useDataLot: () => ({
    cancelQueries: cancelQueriesMock,
    getQueryData: getQueryDataMock,
    setQueryData: setQueryDataMock,
    invalidateQueries: invalidateQueriesMock,
  }),
}));

vi.mock("@/shared/model", () => ({
  useToast: () => ({ openErrorToast: openErrorToastMock }),
}));

vi.mock("../api/issue.queries", () => ({
  issueQueries: {
    issues: () => ["issues"],
    listByProject: (projectId: string) => ({
      queryKey: ["issues", "list", projectId],
    }),
  },
}));

vi.mock("../api/issue.mutations", () => ({
  issueMutations: {
    assign: () => ({
      mutationKey: ["issues", "assign"],
      mutationFn: vi.fn(),
    }),
  },
}));

const { useAssignIssue } = await import("./useAssignIssue");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getOpts = (current: any) => current._opts as Record<string, any>;

const makeResponse = (items: IssueType[]): HttpResponseType<IssueType[]> => ({
  success: true,
  message: "ok",
  timestamp: new Date(),
  items,
});

const makeIssue = (overrides: Partial<IssueType> = {}): IssueType =>
  ({
    id: "issue-1",
    project: "proj-1",
    issueNumber: 1,
    issueKey: "PROJ-1",
    type: "TASK",
    title: "테스트 이슈",
    status: "todo",
    priority: "MEDIUM",
    reporter: "user-1",
    labels: [],
    ...overrides,
  }) as IssueType;

describe("useAssignIssue", () => {
  beforeEach(() => {
    mutateFnMock.mockReset();
    cancelQueriesMock.mockReset();
    getQueryDataMock.mockReset();
    setQueryDataMock.mockReset();
    invalidateQueriesMock.mockReset();
    openErrorToastMock.mockReset();
  });

  it("useMutation에 올바른 콜백을 설정한다", () => {
    const { result } = renderHook(() => useAssignIssue("proj-1"));
    const opts = getOpts(result.current);

    expect(opts).toBeDefined();
    expect(opts.onMutate).toBeTypeOf("function");
    expect(opts.onError).toBeTypeOf("function");
    expect(opts.onSettled).toBeTypeOf("function");
  });

  describe("onMutate (optimistic update)", () => {
    it("쿼리를 취소하고 이전 데이터를 반환한다", async () => {
      const { result } = renderHook(() => useAssignIssue("proj-1"));
      const opts = getOpts(result.current);

      const previous = makeResponse([makeIssue()]);

      getQueryDataMock.mockReturnValue(previous);
      cancelQueriesMock.mockResolvedValue(undefined);

      const ctx = await opts.onMutate({
        issueId: "issue-1",
        assignee: "user-2",
      });

      expect(cancelQueriesMock).toHaveBeenCalledWith({
        queryKey: ["issues", "list", "proj-1"],
      });
      expect(ctx).toEqual({ previous });
    });

    it("캐시에 새 assignee를 즉시 반영한다", async () => {
      const { result } = renderHook(() => useAssignIssue("proj-1"));
      const opts = getOpts(result.current);

      const original = makeResponse([makeIssue({ id: "issue-1", assignee: "user-1" })]);

      getQueryDataMock.mockReturnValue(original);
      cancelQueriesMock.mockResolvedValue(undefined);

      await opts.onMutate({ issueId: "issue-1", assignee: "user-2" });

      const updater = setQueryDataMock.mock.calls[0]?.[1];
      const updated = updater(original);

      expect(updated.items[0].assignee).toBe("user-2");
    });

    it("assignee를 undefined로 전달하면 미할당으로 변경한다", async () => {
      const { result } = renderHook(() => useAssignIssue("proj-1"));
      const opts = getOpts(result.current);

      const original = makeResponse([makeIssue({ id: "issue-1", assignee: "user-1" })]);

      getQueryDataMock.mockReturnValue(original);
      cancelQueriesMock.mockResolvedValue(undefined);

      await opts.onMutate({ issueId: "issue-1", assignee: undefined });

      const updater = setQueryDataMock.mock.calls[0]?.[1];
      const updated = updater(original);

      expect(updated.items[0].assignee).toBeUndefined();
    });

    it("old가 없으면 캐시를 변경하지 않는다", async () => {
      const { result } = renderHook(() => useAssignIssue("proj-1"));
      const opts = getOpts(result.current);

      getQueryDataMock.mockReturnValue(undefined);
      cancelQueriesMock.mockResolvedValue(undefined);

      await opts.onMutate({ issueId: "issue-1", assignee: "user-2" });

      const updater = setQueryDataMock.mock.calls[0]?.[1];

      expect(updater(undefined)).toBeUndefined();
    });

    it("다른 이슈의 assignee는 변경하지 않는다", async () => {
      const { result } = renderHook(() => useAssignIssue("proj-1"));
      const opts = getOpts(result.current);

      const original = makeResponse([
        makeIssue({ id: "issue-1", assignee: "user-1" }),
        makeIssue({ id: "issue-2", assignee: "user-3" }),
      ]);

      getQueryDataMock.mockReturnValue(original);
      cancelQueriesMock.mockResolvedValue(undefined);

      await opts.onMutate({ issueId: "issue-1", assignee: "user-2" });

      const updater = setQueryDataMock.mock.calls[0]?.[1];
      const updated = updater(original);

      expect(updated.items[0].assignee).toBe("user-2");
      expect(updated.items[1].assignee).toBe("user-3");
    });
  });

  describe("onError (rollback)", () => {
    it("이전 데이터로 롤백하고 에러 토스트를 띄운다", () => {
      const { result } = renderHook(() => useAssignIssue("proj-1"));
      const opts = getOpts(result.current);
      const previous = makeResponse([makeIssue()]);

      opts.onError(new Error("fail"), {}, { previous });

      expect(setQueryDataMock).toHaveBeenCalledWith(["issues", "list", "proj-1"], previous);
      expect(openErrorToastMock).toHaveBeenCalledWith({
        message: "담당자를 변경하지 못했어요.",
      });
    });

    it("context가 없으면 rollback을 건너뛴다", () => {
      const { result } = renderHook(() => useAssignIssue("proj-1"));
      const opts = getOpts(result.current);

      opts.onError(new Error("fail"), {}, undefined);

      expect(setQueryDataMock).not.toHaveBeenCalled();
      expect(openErrorToastMock).toHaveBeenCalled();
    });
  });

  describe("onSettled", () => {
    it("issues 쿼리를 invalidate한다", async () => {
      const { result } = renderHook(() => useAssignIssue("proj-1"));
      const opts = getOpts(result.current);

      await opts.onSettled();

      expect(invalidateQueriesMock).toHaveBeenCalledWith({
        queryKey: ["issues"],
      });
    });
  });
});
