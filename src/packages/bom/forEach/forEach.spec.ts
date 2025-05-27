import { describe, test, expect, vi } from "vitest";
import { forEach } from "./forEach";

describe("forEach()", () => {
  test("Invoke callback function - data first", () => {
    const arr = [1, 2, 3];
    const cb = vi.fn<(v: number) => void>();

    forEach(arr, cb);

    expect(cb).toHaveBeenCalledWith(1, 0, arr);
    expect(cb).toHaveBeenCalledWith(2, 1, arr);
    expect(cb).toHaveBeenCalledWith(3, 2, arr);
  });

  test("Invoke callback function - data last", () => {
    const arr = [1, 2, 3];
    const cb = vi.fn<(v: number) => void>();
    const result = forEach<typeof arr>(cb)(arr);

    expect(cb).toHaveBeenCalledWith(1, 0, arr);
    expect(cb).toHaveBeenCalledWith(2, 1, arr);
    expect(cb).toHaveBeenCalledWith(3, 2, arr);
    expect(result).toBe(arr);
  });
});
