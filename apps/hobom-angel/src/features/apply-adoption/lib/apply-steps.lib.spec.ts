import { describe, expect, it } from "vitest";
import type { Question } from "@/entities/questionnaire";
import { isAnswered, isStepBlocked, toAnswerList } from "./apply-steps.lib";

const q = (id: string, type: Question["type"], required = false): Question => ({
  id,
  prompt: id,
  type,
  options: type === "SINGLE_CHOICE" || type === "MULTI_CHOICE" ? ["a", "b"] : [],
  required,
});

describe("isAnswered", () => {
  it("treats whitespace-only text as unanswered", () => {
    expect(isAnswered(q("1", "TEXT"), ["   "])).toBe(false);
    expect(isAnswered(q("1", "TEXT"), ["집"])).toBe(true);
  });

  it("counts any selected choice as answered", () => {
    expect(isAnswered(q("1", "SINGLE_CHOICE"), ["a"])).toBe(true);
    expect(isAnswered(q("1", "MULTI_CHOICE"), [])).toBe(false);
  });
});

describe("isStepBlocked", () => {
  it("blocks only when a required question is unanswered", () => {
    expect(isStepBlocked(q("1", "TEXT", true), {})).toBe(true);
    expect(isStepBlocked(q("1", "TEXT", true), { "1": ["집"] })).toBe(false);
    expect(isStepBlocked(q("1", "TEXT", false), {})).toBe(false);
  });
});

describe("toAnswerList", () => {
  it("keeps only answered questions and trims text", () => {
    const questions = [q("1", "TEXT"), q("2", "MULTI_CHOICE"), q("3", "TEXT")];
    const result = toAnswerList(questions, { "1": [" 집 "], "2": [], "3": [""] });

    expect(result).toEqual([{ questionId: "1", values: ["집"] }]);
  });
});
