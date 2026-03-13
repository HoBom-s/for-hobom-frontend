import { describe, expect, it } from "vitest";
import { groupNotificationsByDate } from "./group-notifications-by-date.lib";
import type { NotificationItemType } from "../api/notification.type";

const makeNotification = (
  id: string,
  createdAt: string,
): NotificationItemType => ({
  id,
  category: "SYSTEM",
  title: `title-${id}`,
  body: `body-${id}`,
  senderId: "sender",
  isRead: false,
  createdAt,
});

describe("groupNotificationsByDate", () => {
  // KST 2026-02-27 23:00 (startOfDay → KST 2026-02-27 00:00)
  const NOW = new Date("2026-02-27T14:00:00+09:00");

  it("오늘 알림을 '오늘' 그룹에 분류한다", () => {
    const items = [makeNotification("1", "2026-02-27T10:00:00+09:00")];
    const groups = groupNotificationsByDate(items, NOW);

    expect(groups).toHaveLength(1);
    expect(groups[0].label).toBe("오늘");
    expect(groups[0].items).toHaveLength(1);
  });

  it("어제 알림을 '어제' 그룹에 분류한다", () => {
    const items = [makeNotification("1", "2026-02-26T12:00:00+09:00")];
    const groups = groupNotificationsByDate(items, NOW);

    expect(groups).toHaveLength(1);
    expect(groups[0].label).toBe("어제");
  });

  it("2~7일 전 알림을 '이번 주' 그룹에 분류한다", () => {
    const items = [makeNotification("1", "2026-02-23T12:00:00+09:00")];
    const groups = groupNotificationsByDate(items, NOW);

    expect(groups).toHaveLength(1);
    expect(groups[0].label).toBe("이번 주");
  });

  it("7일 이상 전 알림을 '이전' 그룹에 분류한다", () => {
    const items = [makeNotification("1", "2026-02-10T12:00:00+09:00")];
    const groups = groupNotificationsByDate(items, NOW);

    expect(groups).toHaveLength(1);
    expect(groups[0].label).toBe("이전");
  });

  it("빈 배열은 빈 결과를 반환한다", () => {
    expect(groupNotificationsByDate([], NOW)).toEqual([]);
  });

  it("여러 날짜의 알림을 올바른 순서로 그룹핑한다", () => {
    const items = [
      makeNotification("1", "2026-02-27T10:00:00+09:00"), // 오늘
      makeNotification("2", "2026-02-26T10:00:00+09:00"), // 어제
      makeNotification("3", "2026-02-23T10:00:00+09:00"), // 이번 주
      makeNotification("4", "2026-02-01T10:00:00+09:00"), // 이전
    ];

    const groups = groupNotificationsByDate(items, NOW);

    expect(groups.map((g) => g.label)).toEqual([
      "오늘",
      "어제",
      "이번 주",
      "이전",
    ]);
  });

  it("해당 그룹에 알림이 없으면 그 그룹을 제외한다", () => {
    const items = [
      makeNotification("1", "2026-02-27T10:00:00+09:00"), // 오늘
      makeNotification("2", "2026-02-01T10:00:00+09:00"), // 이전
    ];

    const groups = groupNotificationsByDate(items, NOW);

    expect(groups.map((g) => g.label)).toEqual(["오늘", "이전"]);
  });

  it("같은 그룹에 여러 알림을 포함한다", () => {
    const items = [
      makeNotification("1", "2026-02-27T13:00:00+09:00"),
      makeNotification("2", "2026-02-27T12:00:00+09:00"),
      makeNotification("3", "2026-02-27T11:00:00+09:00"),
    ];

    const groups = groupNotificationsByDate(items, NOW);

    expect(groups).toHaveLength(1);
    expect(groups[0].items).toHaveLength(3);
  });
});
