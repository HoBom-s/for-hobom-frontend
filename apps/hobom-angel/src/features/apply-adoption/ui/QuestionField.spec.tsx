// @vitest-environment jsdom
import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Question } from "@/entities/questionnaire";
import { QuestionField } from "./QuestionField";

const question = (type: Question["type"], options: string[] = []): Question => ({
  id: "q1",
  prompt: "질문",
  type,
  options,
  required: false,
});

/** Controlled harness that surfaces the current answer for assertions. */
const Harness = ({ q }: { q: Question }) => {
  const [values, setValues] = useState<string[]>([]);

  return (
    <>
      <QuestionField question={q} values={values} onChange={setValues} />
      <output data-testid="values">{values.join(",")}</output>
    </>
  );
};

const answer = () => screen.getByTestId("values").textContent;

describe("QuestionField", () => {
  it("selects a single choice", () => {
    render(<Harness q={question("SINGLE_CHOICE", ["아파트", "주택", "원룸"])} />);

    fireEvent.click(screen.getByRole("button", { name: "주택" }));

    expect(answer()).toBe("주택");
  });

  it("toggles multiple choices on and off", () => {
    render(<Harness q={question("MULTI_CHOICE", ["자녀", "부모님"])} />);

    fireEvent.click(screen.getByRole("button", { name: "자녀" }));
    fireEvent.click(screen.getByRole("button", { name: "부모님" }));

    expect(answer()).toBe("자녀,부모님");

    fireEvent.click(screen.getByRole("button", { name: "자녀" }));

    expect(answer()).toBe("부모님");
  });

  it("maps a boolean answer to true/false", () => {
    render(<Harness q={question("BOOLEAN")} />);

    fireEvent.click(screen.getByRole("button", { name: "아니오" }));

    expect(answer()).toBe("false");
  });

  it("captures free text", () => {
    render(<Harness q={question("TEXT")} />);

    fireEvent.change(screen.getByPlaceholderText("자유롭게 작성해주세요"), {
      target: { value: "함께 살고 싶어요" },
    });

    expect(answer()).toBe("함께 살고 싶어요");
  });
});
