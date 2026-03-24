import type { RequestSearchParams, ErrorSearchParams } from "./analytics.type";

const mockGet = vi.fn();

vi.mock("@/shared/api", () => ({
  httpClient: { get: (...args: unknown[]) => mockGet(...args) },
}));

const {
  fetchTrafficTrends,
  fetchStatusCodes,
  fetchLatency,
  fetchSlowEndpoints,
  fetchErrorTrend,
  fetchErrorDistribution,
  fetchRecentErrors,
  fetchRequests,
  fetchErrors,
  fetchTrace,
} = await import("./analytics.api");

describe("analytics API — DateRangeParams fetchers", () => {
  beforeEach(() => {
    mockGet.mockReset();
    mockGet.mockResolvedValue({ points: [] });
  });

  it.each([
    ["fetchTrafficTrends", fetchTrafficTrends, "/analytics/traffic/trends"],
    ["fetchStatusCodes", fetchStatusCodes, "/analytics/traffic/status-codes"],
    ["fetchLatency", fetchLatency, "/analytics/traffic/latency"],
    ["fetchSlowEndpoints", fetchSlowEndpoints, "/analytics/traffic/latency/slow-endpoints"],
    ["fetchErrorTrend", fetchErrorTrend, "/analytics/errors/trend"],
    ["fetchErrorDistribution", fetchErrorDistribution, "/analytics/errors/distribution"],
    ["fetchRecentErrors", fetchRecentErrors, "/analytics/errors/recent"],
  ])("%s calls correct endpoint with from/to params", (_name, fn, basePath) => {
    fn({ from: "2026-03-01T00:00:00Z", to: "2026-03-02T00:00:00Z" });

    const url = mockGet.mock.calls[0][0] as string;

    expect(url).toContain(basePath);
    expect(url).toContain("from=2026-03-01");
    expect(url).toContain("to=2026-03-02");
  });
});

describe("analytics API — search fetchers", () => {
  beforeEach(() => {
    mockGet.mockReset();
    mockGet.mockResolvedValue({ logs: [], totalCount: 0, page: 1, pageSize: 20 });
  });

  it("fetchRequests builds query string with all params", () => {
    const params: RequestSearchParams = {
      method: "GET",
      path: "/api/test",
      statusCode: 200,
      from: "2026-03-01T00:00:00Z",
      to: "2026-03-05T00:00:00Z",
      page: 1,
      pageSize: 20,
    };

    fetchRequests(params);

    const url = mockGet.mock.calls[0][0] as string;

    expect(url).toContain("method=GET");
    expect(url).toContain("path=%2Fapi%2Ftest");
    expect(url).toContain("statusCode=200");
    expect(url).toContain("page=1");
    expect(url).toContain("pageSize=20");
  });

  it("fetchRequests omits undefined/empty params", () => {
    const params: RequestSearchParams = { method: "", page: 1, pageSize: 10 };

    fetchRequests(params);

    const url = mockGet.mock.calls[0][0] as string;

    expect(url).not.toContain("method");
    expect(url).toContain("page=1");
    expect(url).toContain("pageSize=10");
  });

  it("fetchErrors builds query with exceptionType param", () => {
    const params: ErrorSearchParams = {
      exceptionType: "NullPointer",
      page: 1,
      pageSize: 10,
    };

    fetchErrors(params);

    const url = mockGet.mock.calls[0][0] as string;

    expect(url).toContain("/search/errors");
    expect(url).toContain("exceptionType=NullPointer");
  });

  it("fetchErrors omits empty string params", () => {
    const params: ErrorSearchParams = {
      exceptionType: "",
      source: "",
      page: 1,
      pageSize: 10,
    };

    fetchErrors(params);

    const url = mockGet.mock.calls[0][0] as string;

    expect(url).not.toContain("exceptionType=");
    expect(url).not.toContain("source=");
  });
});

describe("fetchTrace", () => {
  beforeEach(() => {
    mockGet.mockReset();
    mockGet.mockResolvedValue({ requestLogs: [], errorLogs: [] });
  });

  it("uses traceId in URL path", () => {
    fetchTrace("abc-123");

    const url = mockGet.mock.calls[0][0] as string;

    expect(url).toBe("/search/trace/abc-123");
  });
});
