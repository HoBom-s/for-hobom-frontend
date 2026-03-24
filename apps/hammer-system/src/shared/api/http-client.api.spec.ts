import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createHttpClient } from "./http-client.api";

describe("createHttpClient", () => {
  const BASE_URL = "https://api.test.com";
  let fetchSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    fetchSpy = vi.spyOn(globalThis, "fetch");
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  const jsonResponse = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  it("GET 요청을 올바른 URL로 보낸다", async () => {
    fetchSpy.mockResolvedValue(jsonResponse({ ok: true }));
    const client = createHttpClient(BASE_URL);

    await client.get("/test");

    expect(fetchSpy).toHaveBeenCalledWith(
      `${BASE_URL}/test`,
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("POST 요청 시 body를 JSON으로 직렬화한다", async () => {
    fetchSpy.mockResolvedValue(jsonResponse({ ok: true }));
    const client = createHttpClient(BASE_URL);

    await client.post("/test", { name: "hello" });

    const init = fetchSpy.mock.calls[0][1] as RequestInit;

    expect(init.body).toBe(JSON.stringify({ name: "hello" }));
  });

  it("PUT 요청이 올바르게 동작한다", async () => {
    fetchSpy.mockResolvedValue(jsonResponse({ ok: true }));
    const client = createHttpClient(BASE_URL);

    await client.put("/test", { id: 1 });

    expect(fetchSpy).toHaveBeenCalledWith(
      `${BASE_URL}/test`,
      expect.objectContaining({ method: "PUT" }),
    );
  });

  it("PATCH 요청이 올바르게 동작한다", async () => {
    fetchSpy.mockResolvedValue(jsonResponse({ ok: true }));
    const client = createHttpClient(BASE_URL);

    await client.patch("/test", { id: 1 });

    expect(fetchSpy).toHaveBeenCalledWith(
      `${BASE_URL}/test`,
      expect.objectContaining({ method: "PATCH" }),
    );
  });

  it("DELETE 요청이 올바르게 동작한다", async () => {
    fetchSpy.mockResolvedValue(jsonResponse({ ok: true }));
    const client = createHttpClient(BASE_URL);

    await client.delete("/test");

    expect(fetchSpy).toHaveBeenCalledWith(
      `${BASE_URL}/test`,
      expect.objectContaining({ method: "DELETE" }),
    );
  });

  it("204 응답은 undefined를 반환한다", async () => {
    fetchSpy.mockResolvedValue(new Response(null, { status: 204 }));
    const client = createHttpClient(BASE_URL);

    const result = await client.get("/test");

    expect(result).toBeUndefined();
  });

  it("credentials가 include로 설정된다", async () => {
    fetchSpy.mockResolvedValue(jsonResponse({}));
    const client = createHttpClient(BASE_URL);

    await client.get("/test");

    const init = fetchSpy.mock.calls[0][1] as RequestInit;

    expect(init.credentials).toBe("include");
  });

  it("Content-Type이 application/json으로 설정된다", async () => {
    fetchSpy.mockResolvedValue(jsonResponse({}));
    const client = createHttpClient(BASE_URL);

    await client.get("/test");

    const init = fetchSpy.mock.calls[0][1] as RequestInit;
    const headers = init.headers as Record<string, string>;

    expect(headers["Content-Type"]).toBe("application/json");
  });

  it("에러 응답 시 HttpError를 throw한다", async () => {
    fetchSpy.mockResolvedValue(jsonResponse({ message: "Not Found" }, 404));
    const client = createHttpClient(BASE_URL);

    await expect(client.get("/missing")).rejects.toThrow();
  });

  it("에러 응답에서 serverMessage를 추출한다", async () => {
    fetchSpy.mockResolvedValue(jsonResponse({ message: "잘못된 요청" }, 400));
    const client = createHttpClient(BASE_URL);

    try {
      await client.get("/bad");
    } catch (e) {
      expect((e as { serverMessage: string }).serverMessage).toBe("잘못된 요청");
    }
  });

  it("retry 옵션이 있으면 재시도한다", async () => {
    fetchSpy
      .mockResolvedValueOnce(jsonResponse({ message: "error" }, 500))
      .mockResolvedValueOnce(jsonResponse({ ok: true }));

    const client = createHttpClient(BASE_URL);

    const result = await client.get("/retry", { retry: 1 });

    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(result).toEqual({ ok: true });
  });

  it("retry 횟수 초과 시 throw한다", async () => {
    fetchSpy.mockResolvedValue(jsonResponse({ message: "error" }, 500));

    const client = createHttpClient(BASE_URL);

    await expect(client.get("/retry", { retry: 1 })).rejects.toThrow();
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it("미들웨어 onRequest 훅이 호출된다", async () => {
    fetchSpy.mockResolvedValue(jsonResponse({}));
    const client = createHttpClient(BASE_URL);
    const onRequest = vi.fn();

    client.use({ onRequest });
    await client.get("/test");

    expect(onRequest).toHaveBeenCalledTimes(1);
  });

  it("미들웨어 onResponse 훅이 호출된다", async () => {
    fetchSpy.mockResolvedValue(jsonResponse({}));
    const client = createHttpClient(BASE_URL);
    const onResponse = vi.fn();

    client.use({ onResponse });
    await client.get("/test");

    expect(onResponse).toHaveBeenCalledTimes(1);
  });

  it("에러 시 미들웨어 onError 훅이 호출된다", async () => {
    fetchSpy.mockResolvedValue(jsonResponse({}, 500));
    const client = createHttpClient(BASE_URL);
    const onError = vi.fn();

    client.use({ onError });

    await expect(client.get("/error")).rejects.toThrow();
    expect(onError).toHaveBeenCalledTimes(1);
  });

  it("baseUrl이 없으면 상대 경로로 요청한다", async () => {
    fetchSpy.mockResolvedValue(jsonResponse({}));
    const client = createHttpClient();

    await client.get("/api/test");

    expect(fetchSpy).toHaveBeenCalledWith("/api/test", expect.anything());
  });

  it("json이 undefined이면 body를 설정하지 않는다", async () => {
    fetchSpy.mockResolvedValue(jsonResponse({}));
    const client = createHttpClient(BASE_URL);

    await client.get("/test");

    const init = fetchSpy.mock.calls[0][1] as RequestInit;

    expect(init.body).toBeUndefined();
  });
});
