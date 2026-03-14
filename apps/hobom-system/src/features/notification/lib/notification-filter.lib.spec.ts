import { describe, it, expect } from "vitest";
import type { NotificationItemType } from "@/entities/notification";
import { TAB_FILTERS, EMPTY_MESSAGES, FILTER_PREDICATES } from "./notification-filter.lib";

const makeNotification = (overrides: Partial<NotificationItemType> = {}): NotificationItemType => ({
  id: "n-1",
  category: "SYSTEM",
  title: "test",
  body: "body",
  senderId: "user-1",
  isRead: false,
  createdAt: new Date().toISOString(),
  ...overrides,
});

describe("FILTER_PREDICATES", () => {
  it("all 필터는 항상 true를 반환한다", () => {
    expect(FILTER_PREDICATES.all(makeNotification({ isRead: false }))).toBe(true);
    expect(FILTER_PREDICATES.all(makeNotification({ isRead: true }))).toBe(true);
  });

  it("unread 필터는 isRead=false일 때 true를 반환한다", () => {
    expect(FILTER_PREDICATES.unread(makeNotification({ isRead: false }))).toBe(true);
  });

  it("unread 필터는 isRead=true일 때 false를 반환한다", () => {
    expect(FILTER_PREDICATES.unread(makeNotification({ isRead: true }))).toBe(false);
  });

  it("read 필터는 isRead=true일 때 true를 반환한다", () => {
    expect(FILTER_PREDICATES.read(makeNotification({ isRead: true }))).toBe(true);
  });

  it("read 필터는 isRead=false일 때 false를 반환한다", () => {
    expect(FILTER_PREDICATES.read(makeNotification({ isRead: false }))).toBe(false);
  });
});

describe("TAB_FILTERS", () => {
  it("모든 TAB_FILTERS 키가 FILTER_PREDICATES에 존재한다", () => {
    for (const filter of TAB_FILTERS) {
      expect(FILTER_PREDICATES).toHaveProperty(filter);
    }
  });
});

describe("EMPTY_MESSAGES", () => {
  it("모든 TAB_FILTERS에 대해 EMPTY_MESSAGES 항목이 존재한다", () => {
    for (const filter of TAB_FILTERS) {
      expect(EMPTY_MESSAGES).toHaveProperty(filter);
      expect(typeof EMPTY_MESSAGES[filter]).toBe("string");
    }
  });
});
