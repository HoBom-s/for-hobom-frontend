import { renderHook, waitFor, act } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { toast } from "react-toastify";
import { server } from "@/test/msw-server";
import { setupMSW } from "@/test/setup";
import { createWrapper } from "@/test/create-wrapper";
import { useNoteMemberShare } from "@/features/note/model/useNoteMemberShare";
import type { NoteItemType } from "@/entities/note";
import { makeUser } from "@/test/fixtures/user.fixture";
import { makeNote, toRawNote } from "@/test/fixtures/note.fixture";
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

const ME = makeUser({
  id: "user-1",
  username: "me",
  nickname: "Me",
  email: "me@test.com",
});
const ALICE = makeUser({
  id: "user-2",
  username: "alice",
  nickname: "Alice",
  email: "alice@test.com",
});
const BOB = makeUser({
  id: "user-3",
  username: "bob",
  nickname: "Bob",
  email: "bob@test.com",
});
const CHARLIE = makeUser({
  id: "user-4",
  username: "charlie",
  nickname: "Charlie",
  email: "charlie@test.com",
});

const ALL_USERS = [ME, ALICE, BOB, CHARLIE];

const NOTE = makeNote({
  owner: "user-1",
  members: ["user-2", "user-3"],
});

const setupHandlers = (note: NoteItemType = NOTE) => {
  server.use(
    http.get(`${API_BASE}/auth/me`, () => HttpResponse.json(wrapResponse(ME))),
    http.get(`${API_BASE}/users`, () => HttpResponse.json(wrapResponse(ALL_USERS))),
    http.get(`${API_BASE}/notes/:id`, () => HttpResponse.json(wrapResponse(toRawNote(note)))),
    http.post(`${API_BASE}/notes/:noteId/members`, () => HttpResponse.json({ success: true })),
    http.delete(
      `${API_BASE}/notes/:noteId/members/:userId`,
      () => new HttpResponse(null, { status: 204 }),
    ),
  );
};

describe("useNoteMemberShare", () => {
  setupMSW();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("owner일 때 isOwner === true", async () => {
    setupHandlers();

    const { result } = renderHook(() => useNoteMemberShare({ open: true, note: NOTE }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.noteMembers).toHaveLength(2);
    });

    expect(result.current.isOwner).toBe(true);
  });

  it("noteMembers가 멤버 id에 해당하는 UserType 배열로 resolve됨", async () => {
    setupHandlers();

    const { result } = renderHook(() => useNoteMemberShare({ open: true, note: NOTE }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.noteMembers).toEqual([ALICE, BOB]);
    });
  });

  it("availableUsers에서 이미 멤버인 유저와 owner 제외됨", async () => {
    setupHandlers();

    const { result } = renderHook(() => useNoteMemberShare({ open: true, note: NOTE }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.availableUsers).toEqual([CHARLIE]);
    });
  });

  it("handleAddMember → POST 요청 발생 + 성공 토스트", async () => {
    setupHandlers();

    const { result } = renderHook(() => useNoteMemberShare({ open: true, note: NOTE }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.noteMembers).toHaveLength(2);
    });

    act(() => {
      result.current.handleAddMember("user-4");
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("멤버를 추가했어요.");
    });
  });

  it("handleRemoveMember → DELETE 요청 발생 + 성공 토스트", async () => {
    setupHandlers();

    const { result } = renderHook(() => useNoteMemberShare({ open: true, note: NOTE }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.noteMembers).toHaveLength(2);
    });

    act(() => {
      result.current.handleRemoveMember("user-2");
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("멤버를 제거했어요.");
    });
  });

  it("owner가 아닐 때 isOwner === false", async () => {
    const notOwnedNote = makeNote({
      owner: "user-2",
      members: ["user-2", "user-3"],
    });

    setupHandlers(notOwnedNote);

    const { result } = renderHook(() => useNoteMemberShare({ open: true, note: notOwnedNote }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.noteMembers).toHaveLength(2);
    });

    expect(result.current.isOwner).toBe(false);
  });
});
