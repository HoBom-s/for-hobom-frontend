import { describe, expect, it } from "vitest";
import type { Question } from "@/entities/questionnaire";
import {
  blankQuestion,
  draftFromQuestionnaire,
  optionsForType,
  questionMeta,
  reorderQuestions,
  saveStatusCaption,
  toDefineInput,
  validateDraft,
} from "./survey-draft.lib";

const q = (over: Partial<Question>): Question => ({
  id: "id",
  prompt: "prompt",
  type: "TEXT",
  options: [],
  required: false,
  ...over,
});

describe("blankQuestion", () => {
  it("is an empty free-text question with the given id", () => {
    expect(blankQuestion("abc")).toEqual({
      id: "abc",
      prompt: "",
      type: "TEXT",
      options: [],
      required: false,
    });
  });
});

describe("draftFromQuestionnaire", () => {
  it("returns an empty draft when no survey is defined", () => {
    expect(draftFromQuestionnaire(null)).toEqual([]);
  });

  it("deep-copies options so edits don't mutate the source", () => {
    const source = {
      id: "s",
      shelterId: "sh",
      purpose: "ADOPTION" as const,
      version: 2,
      questions: [q({ id: "a", type: "SINGLE_CHOICE", options: ["x"] })],
    };
    const draft = draftFromQuestionnaire(source);

    draft[0]?.options.push("y");

    expect(source.questions[0]?.options).toEqual(["x"]);
  });
});

describe("reorderQuestions", () => {
  const list = [q({ id: "a" }), q({ id: "b" }), q({ id: "c" })];

  it("drops the active item onto the target slot", () => {
    expect(reorderQuestions(list, "a", "c").map((x) => x.id)).toEqual(["b", "c", "a"]);
    expect(reorderQuestions(list, "c", "a").map((x) => x.id)).toEqual(["c", "a", "b"]);
  });

  it("is a no-op for unknown ids or a self-drop", () => {
    expect(reorderQuestions(list, "a", "a").map((x) => x.id)).toEqual(["a", "b", "c"]);
    expect(reorderQuestions(list, "z", "a").map((x) => x.id)).toEqual(["a", "b", "c"]);
  });
});

describe("validateDraft", () => {
  it("flags a blank prompt", () => {
    expect(validateDraft([q({ id: "a", prompt: "  " })])).toEqual([
      { id: "a", message: "질문 내용을 입력해 주세요." },
    ]);
  });

  it("flags a choice question with no real option", () => {
    const errors = validateDraft([q({ id: "a", type: "MULTI_CHOICE", options: ["", " "] })]);

    expect(errors).toEqual([{ id: "a", message: "선택지를 하나 이상 추가해 주세요." }]);
  });

  it("passes a valid draft", () => {
    expect(
      validateDraft([
        q({ id: "a", prompt: "이름?", type: "TEXT" }),
        q({ id: "b", prompt: "형태?", type: "SINGLE_CHOICE", options: ["집"] }),
      ]),
    ).toEqual([]);
  });
});

describe("toDefineInput", () => {
  it("trims prompts and drops empty options, and clears options for non-choice types", () => {
    const input = toDefineInput([
      q({ id: "a", prompt: "  이유  ", type: "TEXT", options: ["stale"] }),
      q({ id: "b", prompt: "형태", type: "SINGLE_CHOICE", options: [" 집 ", "", "원룸"] }),
    ]);

    expect(input.questions[0]).toEqual({
      id: "a",
      prompt: "이유",
      type: "TEXT",
      options: [],
      required: false,
    });
    expect(input.questions[1]?.options).toEqual(["집", "원룸"]);
  });
});

describe("saveStatusCaption", () => {
  it("describes an unsaved new survey", () => {
    expect(saveStatusCaption(false, true)).toBe("아직 저장하지 않은 새 설문");
  });

  it("describes unsaved edits to a published survey", () => {
    expect(saveStatusCaption(true, true)).toBe("저장하지 않은 변경 사항");
  });

  it("describes a saved, unchanged survey", () => {
    expect(saveStatusCaption(true, false)).toBe("신청서에 반영된 버전이에요");
  });
});

describe("questionMeta", () => {
  it("renders the type and required flag as a mono meta line", () => {
    expect(questionMeta(q({ type: "SINGLE_CHOICE", required: true }))).toBe("SINGLE_CHOICE · 필수");
    expect(questionMeta(q({ type: "TEXT", required: false }))).toBe("TEXT · 선택");
  });
});

describe("optionsForType", () => {
  it("clears options for non-choice types", () => {
    expect(optionsForType("BOOLEAN", ["a", "b"])).toEqual([]);
  });

  it("seeds one blank option when switching an empty row to a choice type", () => {
    expect(optionsForType("SINGLE_CHOICE", [])).toEqual([""]);
  });

  it("keeps existing options when switching between choice types", () => {
    expect(optionsForType("MULTI_CHOICE", ["a"])).toEqual(["a"]);
  });
});
