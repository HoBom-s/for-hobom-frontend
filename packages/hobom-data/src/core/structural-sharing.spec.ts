import { describe, expect, it } from "vitest";
import { replaceEqualDeep } from "./structural-sharing";

describe("replaceEqualDeep", () => {
  it("동일 참조면 그대로 반환한다", () => {
    const obj = { a: 1 };

    expect(replaceEqualDeep(obj, obj)).toBe(obj);
  });

  it("프리미티브 값이 같으면 prev를 반환한다", () => {
    expect(replaceEqualDeep(1, 1)).toBe(1);
    expect(replaceEqualDeep("a", "a")).toBe("a");
    expect(replaceEqualDeep(true, true)).toBe(true);
    expect(replaceEqualDeep(null, null)).toBe(null);
  });

  it("프리미티브 값이 다르면 next를 반환한다", () => {
    expect(replaceEqualDeep(1, 2)).toBe(2);
    expect(replaceEqualDeep("a", "b")).toBe("b");
  });

  describe("plain object", () => {
    it("구조적으로 동일하면 prev 참조를 유지한다", () => {
      const prev = { a: 1, b: { c: 2 } };
      const next = { a: 1, b: { c: 2 } };

      const result = replaceEqualDeep(prev, next);

      expect(result).toBe(prev);
      expect(result).not.toBe(next);
    });

    it("변경된 부분만 새 참조, 나머지는 prev 참조 유지", () => {
      const inner = { c: 2 };
      const prev = { a: 1, b: inner, d: { e: 3 } };
      const next = { a: 1, b: { c: 2 }, d: { e: 999 } };

      const result = replaceEqualDeep(prev, next);

      expect(result).not.toBe(prev);
      // b는 구조적으로 동일 → prev의 inner 참조 유지
      expect(result.b).toBe(inner);
      // d는 값이 다름 → 새 참조
      expect(result.d).not.toBe(prev.d);
      expect(result.d).toEqual({ e: 999 });
    });

    it("키 개수가 다르면 next를 반환한다", () => {
      const prev = { a: 1 };
      const next = { a: 1, b: 2 };

      expect(replaceEqualDeep(prev, next)).toBe(next);
    });
  });

  describe("array", () => {
    it("구조적으로 동일하면 prev 참조를 유지한다", () => {
      const prev = [1, 2, 3];
      const next = [1, 2, 3];

      expect(replaceEqualDeep(prev, next)).toBe(prev);
    });

    it("변경된 요소만 새 참조, 나머지는 prev 참조 유지", () => {
      const item1 = { id: 1, name: "a" };
      const item2 = { id: 2, name: "b" };
      const prev = [item1, item2];
      const next = [
        { id: 1, name: "a" },
        { id: 2, name: "changed" },
      ];

      const result = replaceEqualDeep(prev, next);

      expect(result).not.toBe(prev);
      expect(result[0]).toBe(item1); // 동일 → 참조 유지
      expect(result[1]).not.toBe(item2); // 변경 → 새 참조
      expect(result[1]).toEqual({ id: 2, name: "changed" });
    });

    it("길이가 다르면 next를 반환한다", () => {
      const prev = [1, 2];
      const next = [1, 2, 3];

      expect(replaceEqualDeep(prev, next)).toBe(next);
    });
  });

  describe("mixed types", () => {
    it("타입이 다르면 next를 반환한다", () => {
      expect(replaceEqualDeep([1], { 0: 1 })).toEqual({ 0: 1 });
      expect(replaceEqualDeep({ a: 1 }, [1])).toEqual([1]);
      expect(replaceEqualDeep(null, { a: 1 })).toEqual({ a: 1 });
      expect(replaceEqualDeep({ a: 1 }, null)).toBe(null);
    });

    it("중첩 구조에서 부분적으로 참조를 유지한다", () => {
      const items = [{ id: 1 }, { id: 2 }];
      const prev = { data: { items, total: 10 }, meta: { page: 1 } };
      const next = { data: { items: [{ id: 1 }, { id: 2 }], total: 10 }, meta: { page: 2 } };

      const result = replaceEqualDeep(prev, next);

      expect(result).not.toBe(prev); // meta changed
      expect(result.data).toBe(prev.data); // data subtree identical → reuse
      expect(result.data.items).toBe(items); // items identical → reuse
      expect(result.meta).not.toBe(prev.meta); // page changed
    });
  });

  describe("Query fetch 시나리오", () => {
    it("API 응답이 동일하면 이전 data 참조를 유지한다", () => {
      const prevResponse = {
        items: [
          { id: 1, title: "할 일 1", done: false },
          { id: 2, title: "할 일 2", done: true },
        ],
        total: 2,
      };

      const nextResponse = {
        items: [
          { id: 1, title: "할 일 1", done: false },
          { id: 2, title: "할 일 2", done: true },
        ],
        total: 2,
      };

      const result = replaceEqualDeep(prevResponse, nextResponse);

      expect(result).toBe(prevResponse);
    });

    it("API 응답 일부만 변경되면 변경 부분만 새 참조", () => {
      const item1 = { id: 1, title: "할 일 1", done: false };
      const prevResponse = {
        items: [item1, { id: 2, title: "할 일 2", done: false }],
        total: 2,
      };

      const nextResponse = {
        items: [
          { id: 1, title: "할 일 1", done: false },
          { id: 2, title: "할 일 2", done: true }, // done 변경
        ],
        total: 2,
      };

      const result = replaceEqualDeep(prevResponse, nextResponse);

      expect(result).not.toBe(prevResponse);
      expect(result.items[0]).toBe(item1); // 변경 없음 → 참조 유지
      expect(result.items[1]).not.toBe(prevResponse.items[1]); // done 변경
    });
  });
});
