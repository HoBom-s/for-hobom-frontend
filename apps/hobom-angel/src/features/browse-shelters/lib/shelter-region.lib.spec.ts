import { describe, expect, it } from "vitest";
import { shelterFilterCodec } from "./shelter-region.lib";

describe("shelterFilterCodec", () => {
  it("decodes a known region from the query", () => {
    expect(shelterFilterCodec.decode(new URLSearchParams("region=부산"))).toEqual({
      region: "부산",
      view: "grid",
    });
  });

  it("ignores an unknown region (falls back to all)", () => {
    expect(shelterFilterCodec.decode(new URLSearchParams("region=화성"))).toEqual({
      region: undefined,
      view: "grid",
    });
    expect(shelterFilterCodec.decode(new URLSearchParams())).toEqual({
      region: undefined,
      view: "grid",
    });
  });

  it("decodes the map view, defaulting to the grid otherwise", () => {
    expect(shelterFilterCodec.decode(new URLSearchParams("view=map")).view).toBe("map");
    expect(shelterFilterCodec.decode(new URLSearchParams("view=list")).view).toBe("grid");
  });

  it("encodes a region and omits it for the all state", () => {
    expect(shelterFilterCodec.encode({ region: "서울", view: "grid" }).get("region")).toBe("서울");
    expect(shelterFilterCodec.encode({ view: "grid" }).toString()).toBe("");
  });

  it("encodes the map view and omits it for the grid", () => {
    expect(shelterFilterCodec.encode({ view: "map" }).get("view")).toBe("map");
    expect(shelterFilterCodec.encode({ region: "대구", view: "grid" }).has("view")).toBe(false);
  });
});
