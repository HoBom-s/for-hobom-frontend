import { describe, expect, it } from "vitest";
import {
  EMPTY_FORM,
  canSubmit,
  isValidBusinessNumber,
  isValidSlug,
  toRegisterInput,
} from "./register-shelter.lib";
import type { RegisterShelterForm } from "./register-shelter.lib";

const valid: RegisterShelterForm = {
  name: "행복 보호소",
  slug: "haengbok-shelter",
  region: "서울",
  city: "강남구",
  roadAddress: "테헤란로 1",
  visibility: "PARTIAL",
  registrationNumber: "",
  businessNumber: "",
};

describe("isValidSlug", () => {
  it("accepts lowercase, digits, and hyphen-separated segments (3–40)", () => {
    expect(isValidSlug("haengbok-shelter")).toBe(true);
    expect(isValidSlug("abc")).toBe(true);
    expect(isValidSlug("a1-b2-c3")).toBe(true);
  });

  it("rejects uppercase, spaces, edge hyphens, and too-short slugs", () => {
    expect(isValidSlug("ab")).toBe(false);
    expect(isValidSlug("Haengbok")).toBe(false);
    expect(isValidSlug("has space")).toBe(false);
    expect(isValidSlug("-lead")).toBe(false);
    expect(isValidSlug("trail-")).toBe(false);
    expect(isValidSlug("a".repeat(41))).toBe(false);
  });
});

describe("isValidBusinessNumber", () => {
  it("requires exactly 10 digits", () => {
    expect(isValidBusinessNumber("1234567890")).toBe(true);
    expect(isValidBusinessNumber("123-45-6789")).toBe(false);
    expect(isValidBusinessNumber("123")).toBe(false);
  });
});

describe("canSubmit", () => {
  it("passes a complete valid form", () => {
    expect(canSubmit(valid)).toBe(true);
  });

  it("fails on the empty form", () => {
    expect(canSubmit(EMPTY_FORM)).toBe(false);
  });

  it("fails an invalid slug or missing required address parts", () => {
    expect(canSubmit({ ...valid, slug: "Bad Slug" })).toBe(false);
    expect(canSubmit({ ...valid, region: "" })).toBe(false);
    expect(canSubmit({ ...valid, roadAddress: "  " })).toBe(false);
  });

  it("allows an empty business number but rejects a malformed one", () => {
    expect(canSubmit({ ...valid, businessNumber: "" })).toBe(true);
    expect(canSubmit({ ...valid, businessNumber: "12345" })).toBe(false);
  });
});

describe("toRegisterInput", () => {
  it("trims fields and omits blank optionals", () => {
    const input = toRegisterInput({
      ...valid,
      name: "  행복 보호소  ",
      registrationNumber: "  ",
      businessNumber: "1234567890",
    });

    expect(input.name).toBe("행복 보호소");
    expect(input.address).toEqual({
      region: "서울",
      city: "강남구",
      roadAddress: "테헤란로 1",
      visibility: "PARTIAL",
    });
    expect(input.registrationNumber).toBeUndefined();
    expect(input.businessNumber).toBe("1234567890");
  });
});
