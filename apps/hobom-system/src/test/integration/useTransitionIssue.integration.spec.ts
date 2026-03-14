import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { toast } from "react-toastify";
import { server } from "@/test/msw-server";
import { setupMSW } from "@/test/setup";
import { createWrapper, createTestQueryClient } from "@/test/create-wrapper";
import { useTransitionIssue } from "@/entities/issue";
import type { IssueType } from "@/entities/issue";
import type { HttpResponseType } from "@/shared/api";
import { makeIssue } from "@/test/fixtures/issue.fixture";
import { wrapResponse } from "@/test/fixtures/response.fixture";

const API_BASE = vi.hoisted(() => "http://localhost:9999/api");

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/shared/config", async (importOriginal) => {
  const original = await importOriginal<typeof import("@/shared/config")>();

  return {
    ...original,
    env: {
      ...original.env,
      VITE_APP_HOBOM_API_GATEWAY_URL: API_BASE,
    },
  };
});

const PROJECT_ID = "proj-1";

const ISSUES_RESPONSE = wrapResponse([makeIssue()]);

describe("useTransitionIssue (integration)", () => {
  setupMSW();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("성공 시 issues 쿼리를 무효화한다", async () => {
    server.use(
      http.post(`${API_BASE}/projects/:projectId/issues/:issueId/transition`, () =>
        HttpResponse.json({ success: true }),
      ),
      http.get(`${API_BASE}/projects/:projectId/issues`, () => HttpResponse.json(ISSUES_RESPONSE)),
    );

    const queryClient = createTestQueryClient();

    queryClient.setQueryData(["issues", "list", PROJECT_ID], ISSUES_RESPONSE);
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useTransitionIssue(PROJECT_ID), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({
      projectId: PROJECT_ID,
      issueId: "issue-1",
      statusId: "done",
    });

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["issues"] });
    });
  });

  it("올바른 endpoint로 POST 전송한다", async () => {
    let capturedUrl = "";

    server.use(
      http.post(`${API_BASE}/projects/:projectId/issues/:issueId/transition`, ({ request }) => {
        capturedUrl = new URL(request.url).pathname;

        return HttpResponse.json({ success: true });
      }),
      http.get(`${API_BASE}/projects/:projectId/issues`, () => HttpResponse.json(ISSUES_RESPONSE)),
    );

    const queryClient = createTestQueryClient();

    queryClient.setQueryData(["issues", "list", PROJECT_ID], ISSUES_RESPONSE);

    const { result } = renderHook(() => useTransitionIssue(PROJECT_ID), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({
      projectId: PROJECT_ID,
      issueId: "issue-1",
      statusId: "done",
    });

    await waitFor(() => {
      expect(capturedUrl).toBe("/api/projects/proj-1/issues/issue-1/transition");
    });
  });

  it("서버 에러(500) 시 캐시를 롤백하고 에러 토스트를 표시한다", async () => {
    server.use(
      http.post(`${API_BASE}/projects/:projectId/issues/:issueId/transition`, () =>
        HttpResponse.json(null, { status: 500 }),
      ),
      http.get(`${API_BASE}/projects/:projectId/issues`, () => HttpResponse.json(ISSUES_RESPONSE)),
    );

    const queryClient = createTestQueryClient();

    queryClient.setQueryData(["issues", "list", PROJECT_ID], ISSUES_RESPONSE);

    const { result } = renderHook(() => useTransitionIssue(PROJECT_ID), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({
      projectId: PROJECT_ID,
      issueId: "issue-1",
      statusId: "done",
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("이슈 상태를 변경하지 못했어요.");
    });

    const cached = queryClient.getQueryData<HttpResponseType<IssueType[]>>([
      "issues",
      "list",
      PROJECT_ID,
    ]);

    expect(cached?.items[0].status).toBe("todo");
  });

  it("네트워크 에러 시 캐시를 롤백하고 에러 토스트를 표시한다", async () => {
    server.use(
      http.post(`${API_BASE}/projects/:projectId/issues/:issueId/transition`, () =>
        HttpResponse.error(),
      ),
      http.get(`${API_BASE}/projects/:projectId/issues`, () => HttpResponse.json(ISSUES_RESPONSE)),
    );

    const queryClient = createTestQueryClient();

    queryClient.setQueryData(["issues", "list", PROJECT_ID], ISSUES_RESPONSE);

    const { result } = renderHook(() => useTransitionIssue(PROJECT_ID), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({
      projectId: PROJECT_ID,
      issueId: "issue-1",
      statusId: "done",
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("이슈 상태를 변경하지 못했어요.");
    });

    const cached = queryClient.getQueryData<HttpResponseType<IssueType[]>>([
      "issues",
      "list",
      PROJECT_ID,
    ]);

    expect(cached?.items[0].status).toBe("todo");
  });
});
