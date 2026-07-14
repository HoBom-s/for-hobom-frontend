import { describe, expect, it } from "vitest";
import { toQueryString } from "./query-string.lib";

describe("toQueryString", () => {
  it("returns an empty string when there is nothing to send", () => {
    expect(toQueryString({})).toBe("");
    expect(toQueryString({ a: undefined, b: null, c: "" })).toBe("");
  });

  it("serializes the present values, prefixed with '?'", () => {
    expect(toQueryString({ species: "DOG", limit: 20 })).toBe("?species=DOG&limit=20");
  });

  it("skips null, undefined, and empty strings but keeps 0 and false", () => {
    expect(toQueryString({ keyword: "", page: 0, active: false, cursor: undefined })).toBe(
      "?page=0&active=false",
    );
  });

  it("encodes special characters", () => {
    expect(toQueryString({ q: "콩 이" })).toBe("?q=%EC%BD%A9+%EC%9D%B4");
  });
});
