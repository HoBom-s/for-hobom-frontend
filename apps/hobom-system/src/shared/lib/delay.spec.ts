import { delayThen } from "./delay.lib";

describe("delayThen", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not call the function before the delay has elapsed", async () => {
    const fn = vi.fn().mockResolvedValue("result");

    delayThen(1000, fn);

    expect(fn).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(999);
    expect(fn).not.toHaveBeenCalled();
  });

  it("calls the function after the specified delay", async () => {
    const fn = vi.fn().mockResolvedValue("result");

    delayThen(1000, fn);

    await vi.runAllTimersAsync();

    expect(fn).toHaveBeenCalledOnce();
  });

  it("returns the resolved value of the function", async () => {
    const fn = vi.fn().mockResolvedValue(42);
    const promise = delayThen(500, fn);

    await vi.runAllTimersAsync();

    expect(await promise).toBe(42);
  });

  it("propagates rejections from the function", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("failed"));
    const promise = delayThen(100, fn);
    // Attach the rejection handler before advancing timers to prevent unhandled rejection
    const assertion = expect(promise).rejects.toThrow("failed");

    await vi.runAllTimersAsync();
    await assertion;
  });
});
