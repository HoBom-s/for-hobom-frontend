import { describe, expect, it } from "vitest";
import { formatShelterAddress } from "./format-shelter-address.lib";
import type { ShelterAddress } from "../model/shelter.model";

const base: ShelterAddress = {
  region: "서울",
  city: null,
  roadAddress: null,
  lat: null,
  lng: null,
};

describe("formatShelterAddress", () => {
  it("joins region, city, and road address when the policy is FULL", () => {
    expect(formatShelterAddress({ ...base, city: "강남구", roadAddress: "테헤란로 123" })).toBe(
      "서울 강남구 테헤란로 123",
    );
  });

  it("drops the hidden road address for a PARTIAL policy", () => {
    expect(formatShelterAddress({ ...base, city: "강남구" })).toBe("서울 강남구");
  });

  it("shows only the region for a HIDDEN policy", () => {
    expect(formatShelterAddress(base)).toBe("서울");
  });
});
