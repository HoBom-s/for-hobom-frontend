import { describe, test, expect } from "vitest";
import { constant } from "./constant";

describe("constant()", () => {
  test("The passed value must be return.", () => {
    const bom = constant("BOM");
    const num = constant(1);
    const double = constant(123.1234);

    expect(bom()).toBe("BOM");
    expect(num()).toBe(1);
    expect(double()).toBe(123.1234);
  });
});
