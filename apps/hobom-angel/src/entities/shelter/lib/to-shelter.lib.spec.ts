import { describe, expect, it } from "vitest";
import { toShelter } from "./to-shelter.lib";
import type { RawShelter } from "../api/shelter.type";

const raw: RawShelter = {
  id: "shelter-1",
  name: "행복보호소",
  slug: "haengbok",
  status: "VERIFIED",
  trustTier: "A",
  addressVisibility: "PARTIAL",
  address: { region: "서울", city: "강남구" },
  facilityPhotos: [
    { objectKey: "a.jpg", kind: "EXTERIOR", caption: "외관" },
    { objectKey: "b.jpg", kind: "OTHER" },
  ],
  intro: "인사말 본문",
  operatingSince: "2015-03-01T00:00:00.000Z",
  representativeName: "김보호",
  visitGuide: "방문 안내",
  supportGuide: "후원 안내",
  coverImageKey: "https://cdn.example.com/cover.jpg",
};

describe("toShelter", () => {
  it("normalizes address parts the policy omitted to null", () => {
    const shelter = toShelter(raw);

    expect(shelter.address.city).toBe("강남구");
    expect(shelter.address.roadAddress).toBeNull();
    expect(shelter.address.lat).toBeNull();
  });

  it("maps facility photo objectKey to url and absent caption to null", () => {
    const shelter = toShelter(raw);

    expect(shelter.facilityPhotos[0]).toEqual({ url: "a.jpg", kind: "EXTERIOR", caption: "외관" });
    expect(shelter.facilityPhotos[1]?.caption).toBeNull();
  });
});
