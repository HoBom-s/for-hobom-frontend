// @vitest-environment happy-dom
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("renders the trigger element", () => {
    render(
      <Tooltip title="hello">
        <button>trigger</button>
      </Tooltip>,
    );
    expect(screen.getByRole("button", { name: "trigger" })).toBeTruthy();
  });

  it("renders the child directly with no tooltip when title is empty", () => {
    render(
      <Tooltip title="">
        <button>bare</button>
      </Tooltip>,
    );
    expect(screen.getByRole("button", { name: "bare" })).toBeTruthy();
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("opens on hover after the delay and shows the title", () => {
    vi.useFakeTimers();
    try {
      render(
        <Tooltip title="details" enterDelay={100}>
          <button>trigger</button>
        </Tooltip>,
      );
      const button = screen.getByRole("button", { name: "trigger" });

      expect(screen.queryByRole("tooltip")).toBeNull();

      fireEvent.mouseEnter(button);
      act(() => {
        vi.advanceTimersByTime(100);
      });

      const tooltip = screen.getByRole("tooltip");

      expect(tooltip.textContent).toBe("details");

      fireEvent.mouseLeave(button);
      expect(screen.queryByRole("tooltip")).toBeNull();
    } finally {
      vi.useRealTimers();
    }
  });
});
