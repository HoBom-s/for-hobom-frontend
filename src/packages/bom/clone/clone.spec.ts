import { describe, test, expect, it } from "vitest";
import { clone } from "./clone";

describe("clone()", () => {
  describe("Primitive", () => {
    test("number", () => {
      expect(clone(0)).toBe(0);
      expect(clone(-1)).toBe(-1);
      expect(clone(10.5)).toBe(10.5);
      expect(clone(1_000_876_123_12)).toBe(1_000_876_123_12);
    });

    test("string", () => {
      expect("Happy Dog").toBe("Happy Dog");
      expect("감사합니다.").toBe("감사합니다.");
    });

    test("boolean", () => {
      expect(false).toBe(false);
      expect(true).toBe(true);
    });
  });

  describe("Object", () => {
    test("copy", () => {
      const obj = {
        first: 1,
        seconds: "2",
        date: new Date(),
      };
      const cloned = clone(obj);

      expect(obj).not.toBe(cloned);
    });
  });

  describe("Array", () => {
    test("copy", () => {
      const array = [1, [2, 3], [[5]]];
      const cloned = clone(array);

      expect(array).not.toBe(cloned);
    });
  });

  describe("functions", () => {
    it("copy", () => {
      const func = [{ a: (v: number): number => v * v }] as const;
      const cloned = clone(func);

      expect(cloned).not.toBe(func);
      expect(cloned).toStrictEqual(func);
      expect(func[0].a).toBe(cloned[0].a);
    });
  });
});
