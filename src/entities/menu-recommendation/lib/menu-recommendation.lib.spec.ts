import { describe, expect, it } from "vitest";
import { getTodayMenuId } from "./menu-recommendation.lib";

describe("menu-recommendation.lib", () => {
  describe("getSelectedDate", () => {
    it("returns todayMenuId if query param is not null", () => {
      const query = new URLSearchParams("todayMenuId=1");
      const todayMenuId = getTodayMenuId(query);
      expect(todayMenuId).toBe("1");
    });
  });
});
