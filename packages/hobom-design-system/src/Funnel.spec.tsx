import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Funnel, Step } from "./Funnel";

const STEPS = ["step1", "step2", "step3"] as const;

describe("Funnel", () => {
  it("현재 step에 해당하는 Step만 렌더링한다", () => {
    render(
      <Funnel steps={STEPS} step="step1">
        <Step name="step1">스텝 1 내용</Step>
        <Step name="step2">스텝 2 내용</Step>
      </Funnel>,
    );

    expect(screen.getByText("스텝 1 내용")).toBeDefined();
    expect(screen.queryByText("스텝 2 내용")).toBeNull();
  });

  it("step 변경 시 새 step을 표시한다", () => {
    const { rerender } = render(
      <Funnel steps={STEPS} step="step1">
        <Step name="step1">스텝 1</Step>
        <Step name="step2">스텝 2</Step>
      </Funnel>,
    );

    expect(screen.getByText("스텝 1")).toBeDefined();

    rerender(
      <Funnel steps={STEPS} step="step2">
        <Step name="step1">스텝 1</Step>
        <Step name="step2">스텝 2</Step>
      </Funnel>,
    );

    expect(screen.getByText("스텝 2")).toBeDefined();
    expect(screen.queryByText("스텝 1")).toBeNull();
  });

  it("onEnter 콜백이 호출된다", () => {
    const onEnter = vi.fn();

    render(
      <Funnel steps={STEPS} step="step1">
        <Step name="step1" onEnter={onEnter}>
          스텝 1
        </Step>
      </Funnel>,
    );

    expect(onEnter).toHaveBeenCalledOnce();
  });

  it("존재하지 않는 step name이면 에러를 throw한다", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() =>
      render(
        <Funnel steps={STEPS} step={"nonexistent" as never}>
          <Step name="step1">스텝 1</Step>
        </Funnel>,
      ),
    ).toThrow();
  });

  it("steps에 포함되지 않은 children은 무시한다", () => {
    render(
      <Funnel steps={STEPS} step="step1">
        <Step name="step1">스텝 1</Step>
        <Step name={"invalid" as never}>유효하지 않은 스텝</Step>
      </Funnel>,
    );

    expect(screen.getByText("스텝 1")).toBeDefined();
    expect(screen.queryByText("유효하지 않은 스텝")).toBeNull();
  });
});
