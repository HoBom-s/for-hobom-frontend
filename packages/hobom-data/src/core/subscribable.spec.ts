import { describe, expect, it, vi } from "vitest";
import { Subscribable } from "./subscribable";

class TestSubscribable extends Subscribable {
  triggerNotify(): void {
    this.notify();
  }
}

describe("Subscribable", () => {
  it("리스너를 구독하고 알림을 받는다", () => {
    const sub = new TestSubscribable();
    const listener = vi.fn();

    sub.subscribe(listener);
    sub.triggerNotify();

    expect(listener).toHaveBeenCalledOnce();
  });

  it("구독 해제 후 알림을 받지 않는다", () => {
    const sub = new TestSubscribable();
    const listener = vi.fn();

    const unsubscribe = sub.subscribe(listener);

    unsubscribe();
    sub.triggerNotify();

    expect(listener).not.toHaveBeenCalled();
  });

  it("여러 리스너에 알림을 보낸다", () => {
    const sub = new TestSubscribable();
    const a = vi.fn();
    const b = vi.fn();

    sub.subscribe(a);
    sub.subscribe(b);
    sub.triggerNotify();

    expect(a).toHaveBeenCalledOnce();
    expect(b).toHaveBeenCalledOnce();
  });

  it("리스너 수를 반환한다", () => {
    const sub = new TestSubscribable();

    expect(sub.getListenerCount()).toBe(0);

    const unsub = sub.subscribe(vi.fn());

    expect(sub.getListenerCount()).toBe(1);

    unsub();
    expect(sub.getListenerCount()).toBe(0);
  });
});
