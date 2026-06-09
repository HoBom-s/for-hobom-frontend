// @vitest-environment happy-dom
import { fireEvent, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useStudioKeyboard } from "./useStudioKeyboard";

describe("useStudioKeyboard", () => {
  it("Escape는 onDeselect를 호출한다", () => {
    const onDeselect = vi.fn();

    renderHook(() => useStudioKeyboard({ onDelete: vi.fn(), onDeselect }));

    fireEvent.keyDown(window, { key: "Escape" });

    expect(onDeselect).toHaveBeenCalledTimes(1);
  });

  it("Delete/Backspace는 onDelete를 호출한다", () => {
    const onDelete = vi.fn();

    renderHook(() => useStudioKeyboard({ onDelete, onDeselect: vi.fn() }));

    fireEvent.keyDown(window, { key: "Delete" });
    fireEvent.keyDown(window, { key: "Backspace" });

    expect(onDelete).toHaveBeenCalledTimes(2);
  });

  it("입력 요소에 포커스된 동안은 무시한다", () => {
    const onDelete = vi.fn();

    renderHook(() => useStudioKeyboard({ onDelete, onDeselect: vi.fn() }));

    const input = document.createElement("input");

    document.body.appendChild(input);
    fireEvent.keyDown(input, { key: "Delete" });
    input.remove();

    expect(onDelete).not.toHaveBeenCalled();
  });
});
