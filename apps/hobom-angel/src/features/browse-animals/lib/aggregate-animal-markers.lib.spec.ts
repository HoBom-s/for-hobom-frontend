import { describe, expect, it } from "vitest";
import type { ShelterMarker } from "@/entities/shelter";
import { aggregateAnimalMarkers } from "./aggregate-animal-markers.lib";

const shelter = (id: string, lat: number | null, lng: number | null): ShelterMarker => ({
  id,
  name: `shelter ${id}`,
  slug: `slug-${id}`,
  region: "서울",
  lat,
  lng,
});

describe("aggregateAnimalMarkers", () => {
  it("counts animals per shelter and badges the marker", () => {
    const animals = [{ shelterId: "s1" }, { shelterId: "s1" }, { shelterId: "s2" }];
    const result = aggregateAnimalMarkers(animals, [
      shelter("s1", 37.5, 127),
      shelter("s2", 35, 129),
    ]);

    expect(result).toEqual([
      { id: "slug-s1", lng: 127, lat: 37.5, label: "shelter s1", badge: "2" },
      { id: "slug-s2", lng: 129, lat: 35, label: "shelter s2", badge: "1" },
    ]);
  });

  it("drops shelters with no matching animals", () => {
    const result = aggregateAnimalMarkers(
      [{ shelterId: "s1" }],
      [shelter("s1", 1, 1), shelter("s2", 2, 2)],
    );

    expect(result.map((m) => m.id)).toEqual(["slug-s1"]);
  });

  it("drops shelters that have animals but no coordinates", () => {
    const result = aggregateAnimalMarkers([{ shelterId: "s1" }], [shelter("s1", null, 127)]);

    expect(result).toEqual([]);
  });
});
