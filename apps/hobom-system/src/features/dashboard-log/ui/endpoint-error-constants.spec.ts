import { getErrorRateColor } from "./endpoint-error-constants";

describe("getErrorRateColor", () => {
  it("returns red for rate >= 0.5", () => {
    expect(getErrorRateColor(0.5)).toBe("#f87171");
    expect(getErrorRateColor(0.9)).toBe("#f87171");
    expect(getErrorRateColor(1.0)).toBe("#f87171");
  });

  it("returns orange for rate >= 0.1 and < 0.5", () => {
    expect(getErrorRateColor(0.1)).toBe("#fb923c");
    expect(getErrorRateColor(0.3)).toBe("#fb923c");
    expect(getErrorRateColor(0.49)).toBe("#fb923c");
  });

  it("returns green for rate < 0.1", () => {
    expect(getErrorRateColor(0)).toBe("#34d399");
    expect(getErrorRateColor(0.05)).toBe("#34d399");
    expect(getErrorRateColor(0.099)).toBe("#34d399");
  });
});
