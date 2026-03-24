const fetchTrafficTrendsMock = vi.fn();
const fetchStatusCodesMock = vi.fn();
const fetchLatencyMock = vi.fn();
const fetchSlowEndpointsMock = vi.fn();
const fetchErrorTrendMock = vi.fn();
const fetchErrorDistributionMock = vi.fn();
const fetchRecentErrorsMock = vi.fn();
const fetchRequestsMock = vi.fn();
const fetchErrorsMock = vi.fn();
const fetchTraceMock = vi.fn();
const toDateRangeMock = vi.fn();

vi.mock("./analytics.api", () => ({
  fetchTrafficTrends: (...args: unknown[]) => fetchTrafficTrendsMock(...args),
  fetchStatusCodes: (...args: unknown[]) => fetchStatusCodesMock(...args),
  fetchLatency: (...args: unknown[]) => fetchLatencyMock(...args),
  fetchSlowEndpoints: (...args: unknown[]) => fetchSlowEndpointsMock(...args),
  fetchErrorTrend: (...args: unknown[]) => fetchErrorTrendMock(...args),
  fetchErrorDistribution: (...args: unknown[]) => fetchErrorDistributionMock(...args),
  fetchRecentErrors: (...args: unknown[]) => fetchRecentErrorsMock(...args),
  fetchRequests: (...args: unknown[]) => fetchRequestsMock(...args),
  fetchErrors: (...args: unknown[]) => fetchErrorsMock(...args),
  fetchTrace: (...args: unknown[]) => fetchTraceMock(...args),
}));

vi.mock("../model/time-range.model", () => ({
  toDateRange: (...args: unknown[]) => toDateRangeMock(...args),
}));

const { analyticsQueries } = await import("./analytics.queries");

describe("analyticsQueries", () => {
  beforeEach(() => {
    toDateRangeMock.mockReturnValue({ from: "2026-03-01T00:00:00Z", to: "2026-03-02T00:00:00Z" });
  });

  describe("queryKey structure", () => {
    it("all() returns base key", () => {
      expect(analyticsQueries.all()).toEqual(["analytics"]);
    });

    it("trafficTrends includes range in key", () => {
      const opts = analyticsQueries.trafficTrends("LAST_24H");

      expect(opts.queryKey).toEqual(["analytics", "traffic-trends", "LAST_24H"]);
    });

    it("statusCodes includes range in key", () => {
      const opts = analyticsQueries.statusCodes("LAST_1H");

      expect(opts.queryKey).toEqual(["analytics", "status-codes", "LAST_1H"]);
    });

    it("latency includes range in key", () => {
      const opts = analyticsQueries.latency("LAST_7D");

      expect(opts.queryKey).toEqual(["analytics", "latency", "LAST_7D"]);
    });

    it("slowEndpoints includes range in key", () => {
      const opts = analyticsQueries.slowEndpoints("LAST_6H");

      expect(opts.queryKey).toEqual(["analytics", "slow-endpoints", "LAST_6H"]);
    });

    it("errorTrend includes range in key", () => {
      const opts = analyticsQueries.errorTrend("LAST_24H");

      expect(opts.queryKey).toEqual(["analytics", "error-trend", "LAST_24H"]);
    });

    it("errorDistribution includes range in key", () => {
      const opts = analyticsQueries.errorDistribution("LAST_24H");

      expect(opts.queryKey).toEqual(["analytics", "error-distribution", "LAST_24H"]);
    });

    it("recentErrors includes range in key", () => {
      const opts = analyticsQueries.recentErrors("LAST_24H");

      expect(opts.queryKey).toEqual(["analytics", "recent-errors", "LAST_24H"]);
    });

    it("requests includes params in key", () => {
      const params = { method: "GET", page: 1, pageSize: 20 };
      const opts = analyticsQueries.requests(params);

      expect(opts.queryKey).toEqual(["analytics", "requests", params]);
    });

    it("errors includes params in key", () => {
      const params = { exceptionType: "error", page: 1, pageSize: 10 };
      const opts = analyticsQueries.errors(params);

      expect(opts.queryKey).toEqual(["analytics", "errors", params]);
    });

    it("trace includes traceId in key", () => {
      const opts = analyticsQueries.trace("abc-123");

      expect(opts.queryKey).toEqual(["analytics", "trace", "abc-123"]);
    });
  });

  describe("queryFn delegates to correct fetch function via toDateRange", () => {
    it("trafficTrends queryFn calls fetchTrafficTrends with DateRangeParams", () => {
      const opts = analyticsQueries.trafficTrends("LAST_1H");

      opts.queryFn({
        queryKey: opts.queryKey,
        signal: new AbortController().signal,
        meta: undefined,
      });

      expect(toDateRangeMock).toHaveBeenCalledWith("LAST_1H");
      expect(fetchTrafficTrendsMock).toHaveBeenCalledWith({
        from: "2026-03-01T00:00:00Z",
        to: "2026-03-02T00:00:00Z",
      });
    });

    it("statusCodes queryFn calls fetchStatusCodes with DateRangeParams", () => {
      const opts = analyticsQueries.statusCodes("LAST_6H");

      opts.queryFn({
        queryKey: opts.queryKey,
        signal: new AbortController().signal,
        meta: undefined,
      });

      expect(toDateRangeMock).toHaveBeenCalledWith("LAST_6H");
      expect(fetchStatusCodesMock).toHaveBeenCalledWith({
        from: "2026-03-01T00:00:00Z",
        to: "2026-03-02T00:00:00Z",
      });
    });

    it("latency queryFn calls fetchLatency with DateRangeParams", () => {
      const opts = analyticsQueries.latency("LAST_24H");

      opts.queryFn({
        queryKey: opts.queryKey,
        signal: new AbortController().signal,
        meta: undefined,
      });

      expect(fetchLatencyMock).toHaveBeenCalledWith({
        from: "2026-03-01T00:00:00Z",
        to: "2026-03-02T00:00:00Z",
      });
    });

    it("slowEndpoints queryFn calls fetchSlowEndpoints with DateRangeParams", () => {
      const opts = analyticsQueries.slowEndpoints("LAST_7D");

      opts.queryFn({
        queryKey: opts.queryKey,
        signal: new AbortController().signal,
        meta: undefined,
      });

      expect(fetchSlowEndpointsMock).toHaveBeenCalledWith({
        from: "2026-03-01T00:00:00Z",
        to: "2026-03-02T00:00:00Z",
      });
    });

    it("errorTrend queryFn calls fetchErrorTrend with DateRangeParams", () => {
      const opts = analyticsQueries.errorTrend("LAST_24H");

      opts.queryFn({
        queryKey: opts.queryKey,
        signal: new AbortController().signal,
        meta: undefined,
      });

      expect(fetchErrorTrendMock).toHaveBeenCalledWith({
        from: "2026-03-01T00:00:00Z",
        to: "2026-03-02T00:00:00Z",
      });
    });

    it("errorDistribution queryFn calls fetchErrorDistribution with DateRangeParams", () => {
      const opts = analyticsQueries.errorDistribution("LAST_24H");

      opts.queryFn({
        queryKey: opts.queryKey,
        signal: new AbortController().signal,
        meta: undefined,
      });

      expect(fetchErrorDistributionMock).toHaveBeenCalledWith({
        from: "2026-03-01T00:00:00Z",
        to: "2026-03-02T00:00:00Z",
      });
    });

    it("recentErrors queryFn calls fetchRecentErrors with DateRangeParams", () => {
      const opts = analyticsQueries.recentErrors("LAST_24H");

      opts.queryFn({
        queryKey: opts.queryKey,
        signal: new AbortController().signal,
        meta: undefined,
      });

      expect(fetchRecentErrorsMock).toHaveBeenCalledWith({
        from: "2026-03-01T00:00:00Z",
        to: "2026-03-02T00:00:00Z",
      });
    });

    it("requests queryFn calls fetchRequests with params directly", () => {
      const params = { method: "POST", page: 1, pageSize: 10 };
      const opts = analyticsQueries.requests(params);

      opts.queryFn({
        queryKey: opts.queryKey,
        signal: new AbortController().signal,
        meta: undefined,
      });

      expect(fetchRequestsMock).toHaveBeenCalledWith(params);
    });

    it("errors queryFn calls fetchErrors with params directly", () => {
      const params = { exceptionType: "timeout", page: 1, pageSize: 20 };
      const opts = analyticsQueries.errors(params);

      opts.queryFn({
        queryKey: opts.queryKey,
        signal: new AbortController().signal,
        meta: undefined,
      });

      expect(fetchErrorsMock).toHaveBeenCalledWith(params);
    });

    it("trace queryFn calls fetchTrace with traceId", () => {
      const opts = analyticsQueries.trace("trace-xyz");

      opts.queryFn({
        queryKey: opts.queryKey,
        signal: new AbortController().signal,
        meta: undefined,
      });

      expect(fetchTraceMock).toHaveBeenCalledWith("trace-xyz");
    });
  });

  describe("staleTime configuration", () => {
    it("dashboard queries have 30s staleTime", () => {
      expect(analyticsQueries.trafficTrends("LAST_24H").staleTime).toBe(30_000);
      expect(analyticsQueries.statusCodes("LAST_24H").staleTime).toBe(30_000);
      expect(analyticsQueries.latency("LAST_24H").staleTime).toBe(30_000);
      expect(analyticsQueries.slowEndpoints("LAST_24H").staleTime).toBe(30_000);
      expect(analyticsQueries.errorTrend("LAST_24H").staleTime).toBe(30_000);
      expect(analyticsQueries.errorDistribution("LAST_24H").staleTime).toBe(30_000);
      expect(analyticsQueries.recentErrors("LAST_24H").staleTime).toBe(30_000);
    });

    it("search queries have 10s staleTime (FAST)", () => {
      expect(analyticsQueries.requests({}).staleTime).toBe(10_000);
      expect(analyticsQueries.errors({}).staleTime).toBe(10_000);
    });

    it("trace query has 60s staleTime (MODERATE)", () => {
      expect(analyticsQueries.trace("x").staleTime).toBe(60_000);
    });
  });
});
