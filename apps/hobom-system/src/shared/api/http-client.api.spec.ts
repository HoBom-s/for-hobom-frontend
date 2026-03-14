import { createHttpClient } from "./http-client.api";
import { HttpError } from "./http-error.api";

const mockFetch = vi.fn();

vi.stubGlobal("fetch", mockFetch);

vi.mock("@/shared/config", () => ({
  env: {
    VITE_APP_HOBOM_API_KEY: "test-key",
    VITE_APP_HOBOM_API_GATEWAY_URL: "https://api.test",
    VITE_APP_HOBOM_SPACE_URL: "https://space.test",
  },
}));

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

beforeEach(() => {
  mockFetch.mockReset();
});

describe("createHttpClient", () => {
  it("GET 요청을 올바르게 전송한다", async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({ ok: true }));
    const client = createHttpClient("https://api.test");

    const result = await client.get("/users");

    expect(result).toEqual({ ok: true });
    expect(mockFetch).toHaveBeenCalledOnce();
    const [url, init] = mockFetch.mock.calls[0];

    expect(url).toBe("https://api.test/users");
    expect(init.method).toBe("GET");
  });

  it("POST 요청에 JSON body를 포함한다", async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({ id: 1 }));
    const client = createHttpClient("https://api.test");

    await client.post("/users", { name: "test" });

    const [, init] = mockFetch.mock.calls[0];

    expect(init.method).toBe("POST");
    expect(init.body).toBe(JSON.stringify({ name: "test" }));
  });

  it("에러 응답 시 HttpError를 throw한다", async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({ message: "Not Found" }, 404));
    const client = createHttpClient("https://api.test");

    await expect(client.get("/missing")).rejects.toThrow(HttpError);

    mockFetch.mockResolvedValueOnce(jsonResponse({ message: "Not Found" }, 404));
    await expect(client.get("/missing")).rejects.toMatchObject({ status: 404 });
  });

  it("에러 응답의 body.message가 string이 아니면 무시한다", async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({ message: 12345 }, 500));
    const client = createHttpClient("https://api.test");

    await expect(client.get("/fail")).rejects.toThrow("HTTP error! status: 500");
  });

  it("에러 응답의 body가 JSON이 아니면 기본 메시지를 사용한다", async () => {
    mockFetch.mockResolvedValueOnce(new Response("not json", { status: 502 }));
    const client = createHttpClient("https://api.test");

    await expect(client.get("/fail")).rejects.toThrow("HTTP error! status: 502");
  });

  it("retry 옵션이 설정되면 실패 시 재시도한다", async () => {
    mockFetch
      .mockRejectedValueOnce(new Error("network error"))
      .mockResolvedValueOnce(jsonResponse({ ok: true }));
    const client = createHttpClient("https://api.test");

    const result = await client.get("/flaky", { retry: 1 });

    expect(result).toEqual({ ok: true });
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it("retry 횟수 초과 시 마지막 에러를 throw한다", async () => {
    mockFetch.mockRejectedValueOnce(new Error("fail 1")).mockRejectedValueOnce(new Error("fail 2"));
    const client = createHttpClient("https://api.test");

    await expect(client.get("/fail", { retry: 1 })).rejects.toThrow("fail 2");
  });

  it("timeout 초과 시 abort된다", async () => {
    mockFetch.mockImplementation(
      (_url: string, init: RequestInit) =>
        new Promise((_resolve, reject) => {
          init.signal?.addEventListener("abort", () =>
            reject(new DOMException("aborted", "AbortError")),
          );
        }),
    );
    const client = createHttpClient("https://api.test");

    await expect(client.get("/slow", { timeout: 50 })).rejects.toThrow();
  });

  it("미들웨어 onRequest가 요청 전에 호출된다", async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({ ok: true }));
    const client = createHttpClient("https://api.test");
    const onRequest = vi.fn();

    client.use({ onRequest });

    await client.get("/test");

    expect(onRequest).toHaveBeenCalledOnce();
    expect(onRequest.mock.calls[0][0]).toHaveProperty("input");
    expect(onRequest.mock.calls[0][0]).toHaveProperty("init");
  });

  it("미들웨어 onResponse가 응답 후에 호출된다", async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({ ok: true }));
    const client = createHttpClient("https://api.test");
    const onResponse = vi.fn();

    client.use({ onResponse });

    await client.get("/test");

    expect(onResponse).toHaveBeenCalledOnce();
    expect(onResponse.mock.calls[0][0]).toHaveProperty("response");
  });
});
