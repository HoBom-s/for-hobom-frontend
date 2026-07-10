import { beforeEach, describe, expect, it, vi } from "vitest";
import { HoBomSchema } from "hobom-schema";
import { parseResponse } from "./parse-response.api";

const reportError = vi.fn();

vi.mock("@/shared/lib/report-error.lib", () => ({
  reportError: (error: Error) => reportError(error),
}));

const itemSchema = HoBomSchema.object({
  id: HoBomSchema.string(),
  title: HoBomSchema.string(),
});

beforeEach(() => {
  reportError.mockReset();
});

describe("parseResponse", () => {
  it("returns the payload and reports nothing when it matches", () => {
    const payload = { id: "1", title: "hello" };

    expect(parseResponse(itemSchema, "GET /items")(payload)).toEqual(payload);
    expect(reportError).not.toHaveBeenCalled();
  });

  it("passes the raw payload through and reports the mismatch (advisory, non-fatal)", () => {
    const wrong = { id: "1" };

    // Never throws — the unvalidated payload flows through unchanged.
    expect(parseResponse(itemSchema, "GET /items")(wrong)).toBe(wrong);

    expect(reportError).toHaveBeenCalledOnce();
    expect(reportError.mock.calls[0][0].message).toMatch(
      /Response validation mismatch \(GET \/items\)/,
    );
  });

  it("reports a wrong field type but still returns the data", () => {
    const wrong = { id: 1, title: "hello" };

    expect(parseResponse(itemSchema, "GET /items")(wrong)).toBe(wrong);
    expect(reportError).toHaveBeenCalledOnce();
  });

  it("validates arrays and reports element mismatches without throwing", () => {
    const listSchema = HoBomSchema.array(itemSchema);
    const good = [
      { id: "1", title: "a" },
      { id: "2", title: "b" },
    ];

    expect(parseResponse(listSchema, "GET /items")(good)).toEqual(good);
    expect(reportError).not.toHaveBeenCalled();

    const bad = [{ id: "1", title: "a" }, { id: "2" }];

    expect(parseResponse(listSchema, "GET /items")(bad)).toBe(bad);
    expect(reportError).toHaveBeenCalledOnce();
  });
});
