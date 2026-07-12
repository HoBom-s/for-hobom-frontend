import { describe, expect, it } from "vitest";
import { isValidEmail } from "./validate-login.lib";

describe("isValidEmail", () => {
  it("accepts a well-formed address and trims whitespace", () => {
    expect(isValidEmail("hobom@example.com")).toBe(true);
    expect(isValidEmail("  hobom@example.com  ")).toBe(true);
  });

  it("rejects malformed addresses", () => {
    expect(isValidEmail("hobom@")).toBe(false);
    expect(isValidEmail("hobom.com")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });
});
