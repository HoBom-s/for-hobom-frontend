import { describe, expect, it } from "vitest";
import type { Question } from "@/entities/questionnaire";
import { answerRows, formatAnswerValues, maskApplicant } from "./application-format.lib";

const q = (id: string, type: Question["type"], prompt: string): Question => ({
  id,
  prompt,
  type,
  options: [],
  required: false,
});

describe("maskApplicant", () => {
  it("shows only the id tail", () => {
    expect(maskApplicant("651f2a9c0b1d2e3f4a5b6c7d")).toBe("신청자 5b6c7d");
  });
});

describe("formatAnswerValues", () => {
  it("maps a boolean to 예/아니오", () => {
    expect(formatAnswerValues("BOOLEAN", ["true"])).toBe("예");
    expect(formatAnswerValues("BOOLEAN", ["false"])).toBe("아니오");
  });

  it("joins multi-choice values", () => {
    expect(formatAnswerValues("MULTI_CHOICE", ["자녀", "부모님"])).toBe("자녀, 부모님");
  });

  it("shows a dash for no answer", () => {
    expect(formatAnswerValues("TEXT", [])).toBe("—");
  });
});

describe("answerRows", () => {
  const questions = [q("a", "TEXT", "이유는?"), q("b", "BOOLEAN", "반려 경험?")];

  it("joins answers to their prompts and formats the values", () => {
    const rows = answerRows(
      [
        { questionId: "a", values: ["좋아서"] },
        { questionId: "b", values: ["true"] },
      ],
      questions,
    );

    expect(rows).toEqual([
      { questionId: "a", prompt: "이유는?", text: "좋아서" },
      { questionId: "b", prompt: "반려 경험?", text: "예" },
    ]);
  });

  it("falls back for a question no longer in the questionnaire", () => {
    const rows = answerRows([{ questionId: "gone", values: ["x"] }], questions);

    expect(rows[0]).toEqual({ questionId: "gone", prompt: "삭제된 질문", text: "x" });
  });
});
