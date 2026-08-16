import { describe, expect, it } from "vitest";
import { formatApprovalDate } from "./approval-format.lib";

describe("formatApprovalDate", () => {
  it("formats an ISO date and passes null through", () => {
    expect(formatApprovalDate("2026-07-26T01:20:00Z")).toContain("7월");
    expect(formatApprovalDate(null)).toBeNull();
  });
});
