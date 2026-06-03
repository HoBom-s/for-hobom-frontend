import { describe, expect, it } from "vitest";
import { resolvePath } from "./resolve-component.lib";

describe("resolvePath", () => {
  const root = { Hb: { Button: "BUTTON", Card: { Root: "CARD_ROOT" } } };

  it("단일 깊이 경로를 해석한다", () => {
    expect(resolvePath(root, "Hb.Button")).toBe("BUTTON");
  });

  it("중첩(compound) 경로를 해석한다", () => {
    expect(resolvePath(root, "Hb.Card.Root")).toBe("CARD_ROOT");
  });

  it("끊긴 경로는 undefined", () => {
    expect(resolvePath(root, "Hb.Nope")).toBeUndefined();
    expect(resolvePath(root, "Bad.Path")).toBeUndefined();
  });
});
