import { describe, expect, it } from "vitest";
import { applyFavoriteToggle, isFavorited } from "./toggle-favorite.lib";
import type { Favorite } from "../model/favorite.model";

const favorite = (targetRef: string): Favorite => ({
  targetType: "ANIMAL",
  targetRef,
  favoritedAt: "2026-07-16T00:00:00.000Z",
});

describe("isFavorited", () => {
  it("reports membership by targetRef", () => {
    const list = [favorite("animal-1"), favorite("animal-2")];

    expect(isFavorited(list, "animal-2")).toBe(true);
    expect(isFavorited(list, "animal-9")).toBe(false);
  });
});

describe("applyFavoriteToggle", () => {
  it("prepends a placeholder when turning on", () => {
    const result = applyFavoriteToggle([favorite("animal-1")], "ANIMAL", "animal-2", true);

    expect(result.map((f) => f.targetRef)).toEqual(["animal-2", "animal-1"]);
    expect(result[0]).toMatchObject({ targetType: "ANIMAL", targetRef: "animal-2", favoritedAt: null });
  });

  it("is idempotent when turning on an already-favorited ref", () => {
    const list = [favorite("animal-1")];

    expect(applyFavoriteToggle(list, "ANIMAL", "animal-1", true)).toBe(list);
  });

  it("drops the ref when turning off", () => {
    const list = [favorite("animal-1"), favorite("animal-2")];

    expect(applyFavoriteToggle(list, "ANIMAL", "animal-1", false).map((f) => f.targetRef)).toEqual([
      "animal-2",
    ]);
  });
});
