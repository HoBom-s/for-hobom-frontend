// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { onIdle } from "./on-idle.lib";

describe("onIdle", () => {
  afterEach(() => vi.useRealTimers());

  it("falls back to a timeout when requestIdleCallback is unavailable", () => {
    vi.useFakeTimers();
    const task = vi.fn();

    onIdle(task);
    vi.runAllTimers();

    expect(task).toHaveBeenCalledOnce();
  });

  it("cancels the pending task", () => {
    vi.useFakeTimers();
    const task = vi.fn();

    onIdle(task)();
    vi.runAllTimers();

    expect(task).not.toHaveBeenCalled();
  });
});
