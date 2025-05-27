import { describe, test, expect } from "vitest";
import { conditional } from "./conditional";

describe("conditional()", () => {
  test("Default case", () => {
    expect(conditional("Bom", conditional.defaultCase())).toBeUndefined();
    expect(
      conditional(
        "Bom",
        conditional.defaultCase(() => "hello"),
      ),
    ).toBe("hello");
  });

  test("data-first", () => {
    expect(conditional("Bom", [(v) => v === "Bom", () => "Robin!"])).toBe(
      "Robin!",
    );
    expect(
      conditional(
        "Bom",
        [(v) => v === "Bom", () => "Robin!"],
        [(v) => v === "FoxMon", () => "FoxMon!"],
      ),
    ).toBe("Robin!");
    expect(
      conditional(
        "FoxMon",
        [(v) => v === "Bom", () => "Robin!"],
        [(v) => v === "FoxMon", () => "FoxMon!"],
      ),
    ).toBe("FoxMon!");
  });

  test("data-last", () => {
    const fn = conditional(
      [(v) => v === "Bom", () => "Robin!"],
      [(v) => v === "FoxMon", () => "FoxMon!"],
    );

    expect(fn("Bom")).toBe("Robin!");
    expect(fn("FoxMon")).toBe("FoxMon!");
  });
});
