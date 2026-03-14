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
    transition: () => ({
      mutationKey: ["issues", "transition"],
      mutationFn: vi.fn(),
    }),
  },
}));

const { useTransitionIssue } = await import("./useTransitionIssue");

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

describe("useTransitionIssue", () => {
  beforeEach(() => {
    mutateFnMock.mockReset();
    cancelQueriesMock.mockReset();
    getQueryDataMock.mockReset();
    setQueryDataMock.mockReset();
    invalidateQueriesMock.mockReset();
    openErrorToastMock.mockReset();
  });

  it("useMutation에 올바른 queryOption을 설정한다", () => {
    const { result } = renderHook(() => useTransitionIssue("proj-1"));

    expect(result.current._opts).toBeDefined();
    expect(result.current._opts.onMutate).toBeTypeOf("function");
    expect(result.current._opts.onError).toBeTypeOf("function");
    expect(result.current._opts.onSettled).toBeTypeOf("function");
  });

  describe("onMutate (optimistic update)", () => {
    it("쿼리를 취소하고 이전 데이터를 반환한다", async () => {
      const { result } = renderHook(() => useTransitionIssue("proj-1"));
      const opts = result.current._opts;

      const previous: HttpResponseType<IssueType[]> = {
        items: [makeIssue()],
      };

      getQueryDataMock.mockReturnValue(previous);
      cancelQueriesMock.mockResolvedValue(undefined);

      const ctx = await opts.onMutate({
        issueId: "issue-1",
        statusId: "in-progress",
      });

      expect(cancelQueriesMock).toHaveBeenCalledWith({
        queryKey: ["issues", "list", "proj-1"],
      });
      expect(ctx).toEqual({ previous });
    });

    it("캐시에 새 status를 즉시 반영한다", async () => {
      const { result } = renderHook(() => useTransitionIssue("proj-1"));
      const opts = result.current._opts;

      const original: HttpResponseType<IssueType[]> = {
        items: [makeIssue({ id: "issue-1", status: "todo" })],
      };

      getQueryDataMock.mockReturnValue(original);
      cancelQueriesMock.mockResolvedValue(undefined);

      await opts.onMutate({ issueId: "issue-1", statusId: "in-progress" });

      const updater = setQueryDataMock.mock.calls[0][1];
      const updated = updater(original);

      expect(updated.items[0].status).toBe("in-progress");
    });

    it("old가 없으면 캐시를 변경하지 않는다", async () => {
      const { result } = renderHook(() => useTransitionIssue("proj-1"));
      const opts = result.current._opts;

      getQueryDataMock.mockReturnValue(undefined);
      cancelQueriesMock.mockResolvedValue(undefined);

      await opts.onMutate({ issueId: "issue-1", statusId: "done" });

      const updater = setQueryDataMock.mock.calls[0][1];

      expect(updater(undefined)).toBeUndefined();
    });
  });

  describe("onError (rollback)", () => {
    it("이전 데이터로 롤백하고 에러 토스트를 띄운다", () => {
      const { result } = renderHook(() => useTransitionIssue("proj-1"));
      const opts = result.current._opts;
      const previous = { items: [makeIssue()] };

      opts.onError(new Error("fail"), {}, { previous });

      expect(setQueryDataMock).toHaveBeenCalledWith(["issues", "list", "proj-1"], previous);
      expect(openErrorToastMock).toHaveBeenCalledWith({
        message: "이슈 상태를 변경하지 못했어요.",
      });
    });

    it("context가 없으면 rollback을 건너뛴다", () => {
      const { result } = renderHook(() => useTransitionIssue("proj-1"));
      const opts = result.current._opts;

      opts.onError(new Error("fail"), {}, undefined);

      expect(setQueryDataMock).not.toHaveBeenCalled();
      expect(openErrorToastMock).toHaveBeenCalled();
    });
  });

  describe("onSettled", () => {
    it("issues 쿼리를 invalidate한다", async () => {
      const { result } = renderHook(() => useTransitionIssue("proj-1"));
      const opts = result.current._opts;

      await opts.onSettled();

      expect(invalidateQueriesMock).toHaveBeenCalledWith({
        queryKey: ["issues"],
      });
    });
  });
});
