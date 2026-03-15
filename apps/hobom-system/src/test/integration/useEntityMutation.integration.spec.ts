// @vitest-environment happy-dom
import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { toast } from "react-toastify";
import { server } from "@/test/msw-server";
import { setupMSW } from "@/test/setup";
import { createWrapper, createTestDataLot } from "@/test/create-wrapper";
import { useCreateNote } from "@/entities/note";

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

const CREATE_REQUEST = { type: "TEXT" as const, title: "Test" };

describe("useEntityMutation (via useCreateNote)", () => {
  setupMSW();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("성공 시 성공 토스트를 표시한다", async () => {
    server.use(http.post(`${API_BASE}/notes`, () => HttpResponse.json({ success: true })));

    const { result } = renderHook(() => useCreateNote(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(CREATE_REQUEST);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("노트를 생성했어요.");
    });
  });

  it("성공 시 notes 쿼리를 무효화한다", async () => {
    server.use(http.post(`${API_BASE}/notes`, () => HttpResponse.json({ success: true })));

    const dataLot = createTestDataLot();
    const invalidateSpy = vi.spyOn(dataLot, "invalidateQueries");

    const { result } = renderHook(() => useCreateNote(), {
      wrapper: createWrapper(dataLot),
    });

    result.current.mutate(CREATE_REQUEST);

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["notes"] });
    });
  });

  it("HTTP 403 시 권한 에러 토스트를 표시한다", async () => {
    server.use(
      http.post(`${API_BASE}/notes`, () =>
        HttpResponse.json({ message: "Forbidden" }, { status: 403 }),
      ),
    );

    const { result } = renderHook(() => useCreateNote(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(CREATE_REQUEST);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("권한이 없어요.");
    });
  });

  it("HTTP 500 시 서버 오류 토스트를 표시한다", async () => {
    server.use(http.post(`${API_BASE}/notes`, () => HttpResponse.json(null, { status: 500 })));

    const { result } = renderHook(() => useCreateNote(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(CREATE_REQUEST);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("서버 오류가 발생했어요.");
    });
  });

  it("HTTP 409 + 서버 메시지 시 서버 메시지를 그대로 표시한다", async () => {
    server.use(
      http.post(`${API_BASE}/notes`, () =>
        HttpResponse.json({ message: "이미 존재하는 노트입니다." }, { status: 409 }),
      ),
    );

    const { result } = renderHook(() => useCreateNote(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(CREATE_REQUEST);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("이미 존재하는 노트입니다.");
    });
  });

  it("네트워크 에러 시 연결 확인 토스트를 표시한다", async () => {
    server.use(http.post(`${API_BASE}/notes`, () => HttpResponse.error()));

    const { result } = renderHook(() => useCreateNote(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(CREATE_REQUEST);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("네트워크 연결을 확인해주세요.");
    });
  });
});
