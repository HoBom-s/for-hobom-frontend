import { describe, it, expect } from "vitest";
import { TodayMenuCandidateSchema, AddMenuRecommendationSchema } from "./menu-recommendation.model";

describe("TodayMenuCandidateSchema", () => {
  const makeValidInput = () => ({
    candidates: ["비빔밥", "라멘"],
    recommendationDate: "2026-03-08",
  });

  it("유효한 입력은 safeParse에 성공한다", () => {
    const result = TodayMenuCandidateSchema.safeParse(makeValidInput());

    expect(result.success).toBe(true);
  });

  it("잘못된 날짜 형식은 safeParse에 실패한다", () => {
    const result = TodayMenuCandidateSchema.safeParse({
      ...makeValidInput(),
      recommendationDate: "2026/03/08",
    });

    expect(result.success).toBe(false);
  });

  it("빈 문자열을 포함한 candidates는 safeParse에 실패한다", () => {
    const result = TodayMenuCandidateSchema.safeParse({
      ...makeValidInput(),
      candidates: [""],
    });

    expect(result.success).toBe(false);
  });
});

describe("AddMenuRecommendationSchema", () => {
  const makeValidInput = () => ({
    name: "비빔밥",
    menuKind: "KOREAN",
    timeOfMeal: "LUNCH",
    foodType: "MEAL",
  });

  it("유효한 입력은 safeParse에 성공한다", () => {
    const result = AddMenuRecommendationSchema.safeParse(makeValidInput());

    expect(result.success).toBe(true);
  });

  it("잘못된 enum 값은 safeParse에 실패한다", () => {
    const result = AddMenuRecommendationSchema.safeParse({
      ...makeValidInput(),
      menuKind: "FRENCH",
    });

    expect(result.success).toBe(false);
  });

  it("빈 name은 safeParse에 실패한다", () => {
    const result = AddMenuRecommendationSchema.safeParse({
      ...makeValidInput(),
      name: "",
    });

    expect(result.success).toBe(false);
  });
});
