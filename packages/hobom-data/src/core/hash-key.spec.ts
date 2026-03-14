import { describe, expect, it } from "vitest";
import { hashKey, partialMatchKey } from "./hash-key";

describe("hashKey", () => {
  it("문자열 배열을 해싱한다", () => {
    expect(hashKey(["todos", "list"])).toBe('["todos","list"]');
  });

  it("객체 키를 정렬하여 deterministic하게 해싱한다", () => {
    const a = hashKey(["todos", { b: 2, a: 1 }]);
    const b = hashKey(["todos", { a: 1, b: 2 }]);

    expect(a).toBe(b);
  });

  it("중첩 객체도 키를 정렬한다", () => {
    const a = hashKey([{ outer: { z: 1, a: 2 } }]);
    const b = hashKey([{ outer: { a: 2, z: 1 } }]);

    expect(a).toBe(b);
  });

  it("숫자, boolean, null을 올바르게 처리한다", () => {
    expect(hashKey([1, true, null])).toBe("[1,true,null]");
  });

  it("빈 배열을 해싱한다", () => {
    expect(hashKey([])).toBe("[]");
  });
});

describe("partialMatchKey", () => {
  it("동일한 키를 매칭한다", () => {
    expect(partialMatchKey(["todos"], ["todos"])).toBe(true);
  });

  it("부분 키로 매칭한다", () => {
    expect(partialMatchKey(["todos"], ["todos", "list"])).toBe(true);
  });

  it("더 긴 prefix는 매칭하지 않는다", () => {
    expect(partialMatchKey(["todos", "list"], ["todos"])).toBe(false);
  });

  it("객체 값도 깊은 비교한다", () => {
    expect(partialMatchKey(["todos", { id: 1 }], ["todos", { id: 1 }, "extra"])).toBe(true);
  });

  it("값이 다르면 매칭하지 않는다", () => {
    expect(partialMatchKey(["todos"], ["users"])).toBe(false);
  });
});
