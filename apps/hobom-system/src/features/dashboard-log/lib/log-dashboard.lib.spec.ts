import type { LogStatusCount } from "@/entities/log";
import { getStatusColor, getStatusLabel, computeKpiSummary } from "./log-dashboard.lib";

describe("getStatusColor", () => {
  it("returns green for 2xx", () => {
    expect(getStatusColor(200)).toBe("#34d399");
    expect(getStatusColor(204)).toBe("#34d399");
    expect(getStatusColor(299)).toBe("#34d399");
  });

  it("returns blue for 3xx", () => {
    expect(getStatusColor(301)).toBe("#60a5fa");
    expect(getStatusColor(304)).toBe("#60a5fa");
  });

  it("returns orange for 4xx", () => {
    expect(getStatusColor(400)).toBe("#fb923c");
    expect(getStatusColor(404)).toBe("#fb923c");
    expect(getStatusColor(499)).toBe("#fb923c");
  });

  it("returns red for 5xx", () => {
    expect(getStatusColor(500)).toBe("#f87171");
    expect(getStatusColor(503)).toBe("#f87171");
  });
});

describe("getStatusLabel", () => {
  it("returns correct labels per status range", () => {
    expect(getStatusLabel(200)).toBe("Success");
    expect(getStatusLabel(301)).toBe("Redirect");
    expect(getStatusLabel(404)).toBe("Client Error");
    expect(getStatusLabel(500)).toBe("Server Error");
  });
});

describe("computeKpiSummary", () => {
  it("returns zero summary for empty array", () => {
    const result = computeKpiSummary([]);

    expect(result).toEqual({
      totalRequests: 0,
      count4xx: 0,
      count5xx: 0,
      errorRate: "0.0",
    });
  });

  it("computes totals from mixed status codes", () => {
    const items: LogStatusCount[] = [
      { statusCode: 200, count: 800 },
      { statusCode: 201, count: 100 },
      { statusCode: 404, count: 50 },
      { statusCode: 422, count: 20 },
      { statusCode: 500, count: 30 },
    ];

    const result = computeKpiSummary(items);

    expect(result.totalRequests).toBe(1000);
    expect(result.count4xx).toBe(70);
    expect(result.count5xx).toBe(30);
    expect(result.errorRate).toBe("10.0");
  });

  it("handles all-success traffic", () => {
    const items: LogStatusCount[] = [{ statusCode: 200, count: 500 }];
    const result = computeKpiSummary(items);

    expect(result.count4xx).toBe(0);
    expect(result.count5xx).toBe(0);
    expect(result.errorRate).toBe("0.0");
  });

  it("handles all-error traffic", () => {
    const items: LogStatusCount[] = [{ statusCode: 500, count: 100 }];
    const result = computeKpiSummary(items);

    expect(result.errorRate).toBe("100.0");
  });

  it("rounds error rate to one decimal", () => {
    const items: LogStatusCount[] = [
      { statusCode: 200, count: 997 },
      { statusCode: 500, count: 3 },
    ];
    const result = computeKpiSummary(items);

    expect(result.errorRate).toBe("0.3");
  });
});
