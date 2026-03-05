import type { LogSearchParams } from "./log.type";

const mockGet = vi.fn();

vi.mock("@/shared/api", () => ({
  internalHttpClient: { get: (...args: unknown[]) => mockGet(...args) },
}));

const { fetchLogSearch } = await import("./log.api");

describe("fetchLogSearch", () => {
  beforeEach(() => {
    mockGet.mockReset();
    mockGet.mockResolvedValue({ items: [] });
  });

  it("builds query string with all params", () => {
    const params: LogSearchParams = {
      serviceType: "HOBOM_BACKEND",
      httpMethod: "GET",
      statusCode: 404,
      startedAt: "2026-03-01T00:00:00",
      endedAt: "2026-03-05T00:00:00",
      page: 2,
      size: 20,
    };

    fetchLogSearch(params);

    const url = mockGet.mock.calls[0][0] as string;
    expect(url).toContain("serviceType=HOBOM_BACKEND");
    expect(url).toContain("httpMethod=GET");
    expect(url).toContain("statusCode=404");
    expect(url).toContain("startedAt=2026-03-01T00%3A00%3A00");
    expect(url).toContain("endedAt=2026-03-05T00%3A00%3A00");
    expect(url).toContain("page=2");
    expect(url).toContain("size=20");
  });

  it("omits undefined optional params", () => {
    const params: LogSearchParams = { page: 0, size: 10 };

    fetchLogSearch(params);

    const url = mockGet.mock.calls[0][0] as string;
    expect(url).not.toContain("serviceType");
    expect(url).not.toContain("httpMethod");
    expect(url).not.toContain("statusCode");
    expect(url).toContain("page=0");
    expect(url).toContain("size=10");
  });

  it("omits empty string params", () => {
    const params: LogSearchParams = {
      serviceType: "",
      httpMethod: "",
      page: 0,
      size: 10,
    };

    fetchLogSearch(params);

    const url = mockGet.mock.calls[0][0] as string;
    expect(url).not.toContain("serviceType");
    expect(url).not.toContain("httpMethod");
  });

  it("uses /logs base path", () => {
    fetchLogSearch({ page: 0, size: 10 });

    const url = mockGet.mock.calls[0][0] as string;
    expect(url).toMatch(/^\/logs\?/);
  });
});
