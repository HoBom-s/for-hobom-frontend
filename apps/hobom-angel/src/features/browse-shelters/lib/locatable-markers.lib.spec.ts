import { describe, expect, it } from "vitest";
import type { ShelterMarker } from "@/entities/shelter";
import { locatableMarkers } from "./locatable-markers.lib";

const marker = (id: string, lat: number | null, lng: number | null): ShelterMarker => ({
  id,
  name: `shelter ${id}`,
  slug: `slug-${id}`,
  region: "서울",
  lat,
  lng,
});

describe("locatableMarkers", () => {
  it("keeps markers that have both coordinates", () => {
    const result = locatableMarkers([marker("1", 37.5, 127), marker("2", 35.1, 129.1)]);

    expect(result.map((m) => m.id)).toEqual(["1", "2"]);
  });

  it("drops markers missing either coordinate", () => {
    const result = locatableMarkers([
      marker("1", 37.5, 127),
      marker("2", null, 127),
      marker("3", 37.5, null),
      marker("4", null, null),
    ]);

    expect(result.map((m) => m.id)).toEqual(["1"]);
  });

  it("narrows the type so lat/lng are non-null", () => {
    const [first] = locatableMarkers([marker("1", 37.5, 127)]);

    // `first.lat` is `number`, not `number | null` — a compile-time guarantee.
    expect(first ? first.lat + first.lng : 0).toBeCloseTo(164.5);
  });
});
