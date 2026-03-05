vi.mock("./log.api", () => ({
  fetchLogLevelSummary: vi.fn(),
  fetchLogServiceSummary: vi.fn(),
  fetchLogStatusSummary: vi.fn(),
  fetchLogRequestSummary: vi.fn(),
  fetchLogEndpointErrors: vi.fn(),
  fetchLogSearch: vi.fn(),
}));

const { logQueries } = await import("./log.queries");

describe("logQueries", () => {
  describe("queryKey structure", () => {
    it("all() returns base key", () => {
      expect(logQueries.all()).toEqual(["logs"]);
    });

    it("levelSummary includes hours in key", () => {
      const opts = logQueries.levelSummary(24);
      expect(opts.queryKey).toEqual(["logs", "level-summary", 24]);
    });

    it("serviceSummary includes hours in key", () => {
      const opts = logQueries.serviceSummary(168);
      expect(opts.queryKey).toEqual(["logs", "service-summary", 168]);
    });

    it("statusSummary includes hours in key", () => {
      const opts = logQueries.statusSummary(24);
      expect(opts.queryKey).toEqual(["logs", "status-summary", 24]);
    });

    it("requestSummary includes hours in key", () => {
      const opts = logQueries.requestSummary(24);
      expect(opts.queryKey).toEqual(["logs", "request-summary", 24]);
    });

    it("endpointErrors includes hours and limit in key", () => {
      const opts = logQueries.endpointErrors(24, 10);
      expect(opts.queryKey).toEqual(["logs", "endpoint-errors", 24, 10]);
    });

    it("search includes params in key", () => {
      const params = { serviceType: "HOBOM_BACKEND", page: 0, size: 20 };
      const opts = logQueries.search(params);
      expect(opts.queryKey).toEqual(["logs", "search", params]);
    });
  });

  describe("queryFn is defined", () => {
    it("every query option has a queryFn", () => {
      expect(logQueries.levelSummary(24).queryFn).toBeDefined();
      expect(logQueries.serviceSummary(24).queryFn).toBeDefined();
      expect(logQueries.statusSummary(24).queryFn).toBeDefined();
      expect(logQueries.requestSummary(24).queryFn).toBeDefined();
      expect(logQueries.endpointErrors(24).queryFn).toBeDefined();
      expect(logQueries.search({}).queryFn).toBeDefined();
    });
  });
});
