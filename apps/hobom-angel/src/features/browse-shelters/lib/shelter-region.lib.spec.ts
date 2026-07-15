import { describe, expect, it } from "vitest";
import { shelterFilterCodec } from "./shelter-region.lib";

describe("shelterFilterCodec", () => {
  it("decodes a known region from the query", () => {
    expect(shelterFilterCodec.decode(new URLSearchParams("region=부산"))).toEqual({
      region: "부산",
    });
  });

  it("ignores an unknown region (falls back to all)", () => {
    expect(shelterFilterCodec.decode(new URLSearchParams("region=화성"))).toEqual({
      region: undefined,
    });
    expect(shelterFilterCodec.decode(new URLSearchParams())).toEqual({ region: undefined });
  });

  it("encodes a region and omits it for the all state", () => {
    expect(shelterFilterCodec.encode({ region: "서울" }).get("region")).toBe("서울");
    expect(shelterFilterCodec.encode({}).toString()).toBe("");
  });
});
