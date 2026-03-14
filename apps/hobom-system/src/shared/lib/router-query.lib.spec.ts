import { describe, it, expect } from "vitest";
import { applyParams, buildPath } from "./router-query.lib";

describe("applyParams", () => {
  it("기존 파라미터에 새 값을 추가한다", () => {
    const base = new URLSearchParams("a=1");
    const result = applyParams(base, { b: "2" });

    expect(result.get("a")).toBe("1");
    expect(result.get("b")).toBe("2");
  });

  it("기존 파라미터 값을 덮어쓴다", () => {
    const base = new URLSearchParams("a=1");
    const result = applyParams(base, { a: "99" });

    expect(result.get("a")).toBe("99");
  });

  it("undefined 값이면 해당 파라미터를 삭제한다", () => {
    const base = new URLSearchParams("a=1&b=2");
    const result = applyParams(base, { a: undefined });

    expect(result.has("a")).toBe(false);
    expect(result.get("b")).toBe("2");
  });

  it("원본 URLSearchParams를 변경하지 않는다", () => {
    const base = new URLSearchParams("a=1");

    applyParams(base, { a: "changed" });

    expect(base.get("a")).toBe("1");
  });

  it("빈 updates는 원본과 동일한 결과를 반환한다", () => {
    const base = new URLSearchParams("x=hello");
    const result = applyParams(base, {});

    expect(result.toString()).toBe("x=hello");
  });
});

describe("buildPath", () => {
  it("파라미터가 있으면 pathname?qs 형식을 반환한다", () => {
    const params = new URLSearchParams("tab=all&date=2026-01-01");

    expect(buildPath("/issues", params)).toBe("/issues?tab=all&date=2026-01-01");
  });

  it("파라미터가 비어있으면 pathname만 반환한다", () => {
    const params = new URLSearchParams();

    expect(buildPath("/issues", params)).toBe("/issues");
  });

  it("trailing ?를 붙이지 않는다", () => {
    const params = new URLSearchParams();
    const result = buildPath("/path", params);

    expect(result.endsWith("?")).toBe(false);
  });
});
