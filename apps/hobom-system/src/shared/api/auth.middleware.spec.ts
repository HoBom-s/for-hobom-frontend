// @vitest-environment happy-dom
import { authMiddleware, UNAUTHORIZED_EVENT, resetUnauthorizedState } from "./auth.middleware";
import type { MiddlewareContext } from "./middleware.type";

const mockFetch = vi.fn();

vi.stubGlobal("fetch", mockFetch);

vi.mock("@/shared/config", () => ({
  env: {
    VITE_APP_HOBOM_API_KEY: "test-key",
    VITE_APP_HOBOM_API_GATEWAY_URL: "https://api.test",
    VITE_APP_HOBOM_SPACE_URL: "https://space.test",
  },
}));

vi.mock("./csrf.middleware", () => ({
  applyCsrfHeader: (headers: Record<string, string>) => ({
    ...headers,
    "X-XSRF-TOKEN": "mock-csrf",
  }),
}));

const createCtx = (status: number): MiddlewareContext => ({
  input: "https://api.test/some-path",
  init: {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  },
  response: new Response(null, { status }),
});

beforeEach(() => {
  mockFetch.mockReset();
  resetUnauthorizedState();
});

describe("authMiddleware.onResponse", () => {
  it("401이 아닌 응답은 무시한다", async () => {
    const ctx = createCtx(200);

    await authMiddleware.onResponse!(ctx);

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("401 → refresh 성공 → 원래 요청을 재시도한다", async () => {
    const retryResponse = new Response(JSON.stringify({ ok: true }), {
      status: 200,
    });

    // refresh 요청 성공
    mockFetch
      .mockResolvedValueOnce(new Response(null, { status: 200 }))
      // retry 요청
      .mockResolvedValueOnce(retryResponse);

    const ctx = createCtx(401);

    await authMiddleware.onResponse!(ctx);

    expect(mockFetch).toHaveBeenCalledTimes(2);
    // 첫 번째 호출: refresh
    expect(mockFetch.mock.calls[0][0]).toContain("/auth/refresh");
    // 두 번째 호출: 원래 요청 retry
    expect(mockFetch.mock.calls[1][0]).toBe("https://api.test/some-path");
    expect(ctx.response?.status).toBe(200);
  });

  it("401 → refresh 실패 → UNAUTHORIZED_EVENT를 발행한다", async () => {
    mockFetch.mockResolvedValueOnce(new Response(null, { status: 401 }));

    const eventSpy = vi.fn();

    window.addEventListener(UNAUTHORIZED_EVENT, eventSpy);

    const ctx = createCtx(401);

    await authMiddleware.onResponse!(ctx);

    expect(eventSpy).toHaveBeenCalledOnce();

    window.removeEventListener(UNAUTHORIZED_EVENT, eventSpy);
  });

  it("이미 unauthorizedDispatched면 refresh를 시도하지 않는다", async () => {
    // 첫 번째: refresh 실패 → unauthorizedDispatched = true
    mockFetch.mockResolvedValueOnce(new Response(null, { status: 401 }));
    const ctx1 = createCtx(401);

    await authMiddleware.onResponse!(ctx1);

    mockFetch.mockReset();

    // 두 번째: dispatch 안 함
    const ctx2 = createCtx(401);

    await authMiddleware.onResponse!(ctx2);

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("동시 401 요청이 하나의 refresh만 수행한다", async () => {
    let refreshResolve: (value: Response) => void;
    const refreshPromise = new Promise<Response>((resolve) => {
      refreshResolve = resolve;
    });

    const retryResponse = new Response(JSON.stringify({ ok: true }), {
      status: 200,
    });

    mockFetch
      .mockImplementationOnce(() => refreshPromise) // refresh
      .mockResolvedValue(retryResponse); // retry (both)

    const ctx1 = createCtx(401);
    const ctx2 = createCtx(401);

    const p1 = authMiddleware.onResponse!(ctx1);
    const p2 = authMiddleware.onResponse!(ctx2);

    refreshResolve!(new Response(null, { status: 200 }));

    await Promise.all([p1, p2]);

    // refresh 1번 + retry 2번 = 3번
    expect(mockFetch).toHaveBeenCalledTimes(3);
    expect(mockFetch.mock.calls[0][0]).toContain("/auth/refresh");
  });

  it("retry 요청에 CSRF 헤더를 재적용한다", async () => {
    mockFetch
      .mockResolvedValueOnce(new Response(null, { status: 200 })) // refresh
      .mockResolvedValueOnce(new Response(null, { status: 200 })); // retry

    const ctx = createCtx(401);

    await authMiddleware.onResponse!(ctx);

    const retryInit = mockFetch.mock.calls[1][1] as RequestInit;
    const headers = retryInit.headers as Record<string, string>;

    expect(headers["X-XSRF-TOKEN"]).toBe("mock-csrf");
  });
});
