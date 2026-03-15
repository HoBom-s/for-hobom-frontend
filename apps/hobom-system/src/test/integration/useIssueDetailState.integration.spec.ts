// @vitest-environment happy-dom
import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "@/test/msw-server";
import { setupMSW } from "@/test/setup";
import { createWrapper, createTestDataLot } from "@/test/create-wrapper";
import { useIssueDetailState } from "@/features/issue-detail/model/useIssueDetailState";
import type { IssueType } from "@/entities/issue";
import type { SprintType } from "@/entities/sprint";
import type { UserType } from "@/entities/user";
import type { ProjectType } from "@/entities/project";
import { makeIssue } from "@/test/fixtures/issue.fixture";
import { makeUser } from "@/test/fixtures/user.fixture";
import { makeProject } from "@/test/fixtures/project.fixture";
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

vi.mock("@/shared/model", () => ({
  useProjectContext: () => ({
    doneStatusIds: new Set(["status-done"]),
  }),
}));

const PROJECT_ID = "proj-1";

const ME = makeUser({
  id: "user-1",
  username: "me",
  nickname: "홍길동",
  email: "me@test.com",
});
const ALICE = makeUser({
  id: "user-2",
  username: "alice",
  nickname: "김철수",
  email: "alice@test.com",
});
const PROJECT = makeProject();

const setupHandlers = ({
  issues = [makeIssue()],
  sprints = [] as SprintType[],
  project = PROJECT,
  users = [ME, ALICE],
}: {
  issues?: IssueType[];
  sprints?: SprintType[];
  project?: ProjectType;
  users?: UserType[];
} = {}) => {
  server.use(
    http.get(`${API_BASE}/projects/:projectId/issues`, () =>
      HttpResponse.json(wrapResponse(issues)),
    ),
    http.get(`${API_BASE}/projects/:projectId/sprints`, () =>
      HttpResponse.json(wrapResponse(sprints)),
    ),
    http.get(`${API_BASE}/auth/me`, () => HttpResponse.json(wrapResponse(ME))),
    http.get(`${API_BASE}/projects/:projectId`, () => HttpResponse.json(wrapResponse(project))),
    http.get(`${API_BASE}/users`, () => HttpResponse.json(wrapResponse(users))),
  );
};

describe("useIssueDetailState (integration)", () => {
  setupMSW();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("parent와 children 이슈 트리를 정확히 구축한다", async () => {
    const epic = makeIssue({ id: "epic-1", type: "EPIC", title: "에픽" });
    const story = makeIssue({
      id: "story-1",
      type: "STORY",
      title: "스토리",
      parent: "epic-1",
    });
    const task = makeIssue({
      id: "task-1",
      type: "TASK",
      title: "작업",
      parent: "story-1",
    });

    setupHandlers({ issues: [epic, story, task] });

    const { result } = renderHook(() => useIssueDetailState(PROJECT_ID, "story-1", true), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.issue?.id).toBe("story-1");
    });

    expect(result.current.parentIssue?.id).toBe("epic-1");
    expect(result.current.childIssues.map((c) => c.id)).toEqual(["task-1"]);
  });

  it("availableParents에서 자신과 자손을 제외한다", async () => {
    const epic = makeIssue({ id: "epic-1", type: "EPIC" });
    const story = makeIssue({
      id: "story-1",
      type: "STORY",
      parent: "epic-1",
    });
    const otherEpic = makeIssue({ id: "epic-2", type: "EPIC" });

    setupHandlers({ issues: [epic, story, otherEpic] });

    const { result } = renderHook(() => useIssueDetailState(PROJECT_ID, "epic-1", true), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.issue?.id).toBe("epic-1");
    });

    const parentIds = result.current.availableParents.map((p) => p.id);

    expect(parentIds).not.toContain("epic-1");
    expect(parentIds).not.toContain("story-1");
    expect(parentIds).toContain("epic-2");
  });

  it("COMPLETED 스프린트를 필터링한다", async () => {
    const sprints: SprintType[] = [
      {
        id: "sprint-1",
        project: PROJECT_ID,
        name: "Sprint 1",
        status: "ACTIVE",
        startDate: "2026-01-01",
        endDate: "2026-01-14",
        createdBy: "user-1",
      },
      {
        id: "sprint-2",
        project: PROJECT_ID,
        name: "Sprint 2",
        status: "COMPLETED",
        startDate: "2025-12-01",
        endDate: "2025-12-14",
        createdBy: "user-1",
      },
      {
        id: "sprint-3",
        project: PROJECT_ID,
        name: "Sprint 3",
        status: "PLANNING",
        startDate: "2026-01-15",
        endDate: "2026-01-28",
        createdBy: "user-1",
      },
    ];

    setupHandlers({ sprints });

    const { result } = renderHook(() => useIssueDetailState(PROJECT_ID, "issue-1", true), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.activeSprints).toHaveLength(2);
    });

    expect(result.current.activeSprints.map((s) => s.id)).toEqual(["sprint-1", "sprint-3"]);
  });

  it("progress를 doneStatusIds 기준으로 계산한다", async () => {
    const epic = makeIssue({ id: "epic-1", type: "EPIC", status: "todo" });
    const child1 = makeIssue({
      id: "child-1",
      type: "TASK",
      parent: "epic-1",
      status: "status-done",
    });
    const child2 = makeIssue({
      id: "child-2",
      type: "TASK",
      parent: "epic-1",
      status: "todo",
    });

    setupHandlers({ issues: [epic, child1, child2] });

    const { result } = renderHook(() => useIssueDetailState(PROJECT_ID, "epic-1", true), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.progress).toEqual({ completed: 1, total: 2 });
    });
  });

  it("projectMembers 닉네임을 resolve한다", async () => {
    setupHandlers();

    const { result } = renderHook(() => useIssueDetailState(PROJECT_ID, "issue-1", true), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.projectMembers).toEqual([
        { userId: "user-1", nickname: "홍길동" },
        { userId: "user-2", nickname: "김철수" },
      ]);
    });
  });

  it("enabled=false이면 모든 쿼리가 미실행되어 데이터가 undefined이다", async () => {
    setupHandlers();

    const dataLot = createTestDataLot();

    const { result } = renderHook(() => useIssueDetailState(PROJECT_ID, "issue-1", false), {
      wrapper: createWrapper(dataLot),
    });

    // 약간의 시간을 두고 확인 — 쿼리가 실행되지 않았는지
    await new Promise((r) => setTimeout(r, 100));

    expect(result.current.issue).toBeUndefined();
    expect(result.current.activeSprints).toEqual([]);
    expect(result.current.projectMembers).toEqual([]);
    expect(result.current.progress).toBeNull();
    // enabled=false이므로 캐시에 쿼리 객체는 존재해도 모두 pending 상태
    for (const query of dataLot.getQueryCache().findAll()) {
      expect(query.getState().status).toBe("pending");
    }
  });
});
