import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { NotificationItemType } from "@/entities/notification";

const useNotificationListMock = vi.fn();
const markReadMutateMock = vi.fn();
const groupNotificationsByDateMock = vi.fn();
const useInfiniteScrollMock = vi.fn();

vi.mock("@/entities/notification", () => ({
  groupNotificationsByDate: (...args: unknown[]) =>
    groupNotificationsByDateMock(...args),
}));

vi.mock("@/features/notification", () => ({
  useNotificationList: (...args: unknown[]) => useNotificationListMock(...args),
  useMarkNotificationRead: () => ({ mutate: markReadMutateMock }),
  TAB_FILTERS: ["all", "unread", "read"] as const,
}));

vi.mock("@/shared/model", () => ({
  useInfiniteScroll: (opts: unknown) => useInfiniteScrollMock(opts),
}));

const { useNotificationCenter } = await import("./useNotificationCenter");

const makeNotification = (
  overrides: Partial<NotificationItemType> = {},
): NotificationItemType => ({
  id: "n-1",
  category: "SYSTEM",
  title: "알림 제목",
  body: "알림 본문",
  senderId: "system",
  isRead: false,
  createdAt: "2026-03-08T12:00:00Z",
  ...overrides,
});

describe("useNotificationCenter", () => {
  beforeEach(() => {
    useNotificationListMock.mockReset();
    markReadMutateMock.mockReset();
    groupNotificationsByDateMock.mockReset();
    useInfiniteScrollMock.mockReset();

    useNotificationListMock.mockReturnValue({
      notifications: [],
      unreadCount: 0,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isPending: false,
    });
    groupNotificationsByDateMock.mockReturnValue([]);
    useInfiniteScrollMock.mockReturnValue(vi.fn());
  });

  it("초기 탭이 0이고 filter가 all이다", () => {
    const { result } = renderHook(() => useNotificationCenter());

    expect(result.current.tab).toBe(0);
    expect(result.current.filter).toBe("all");
  });

  it("탭 변경 시 filter 값이 변경된다", () => {
    const { result } = renderHook(() => useNotificationCenter());

    act(() => result.current.setTab(1));
    expect(result.current.tab).toBe(1);
    expect(result.current.filter).toBe("unread");

    act(() => result.current.setTab(2));
    expect(result.current.filter).toBe("read");
  });

  it("알림 목록을 날짜별로 그룹핑한다", () => {
    const notifications = [makeNotification()];
    const dateGroups = [{ date: "2026-03-08", notifications }];
    useNotificationListMock.mockReturnValue({
      notifications,
      unreadCount: 1,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isPending: false,
    });
    groupNotificationsByDateMock.mockReturnValue(dateGroups);

    const { result } = renderHook(() => useNotificationCenter());

    expect(groupNotificationsByDateMock).toHaveBeenCalledWith(notifications);
    expect(result.current.dateGroups).toBe(dateGroups);
  });

  describe("handleMarkRead", () => {
    it("읽지 않은 알림이면 mutate를 호출한다", () => {
      const { result } = renderHook(() => useNotificationCenter());
      const notification = makeNotification({ id: "n-1", isRead: false });

      act(() => result.current.handleMarkRead(notification));

      expect(markReadMutateMock).toHaveBeenCalledWith("n-1");
    });

    it("이미 읽은 알림이면 mutate를 호출하지 않는다", () => {
      const { result } = renderHook(() => useNotificationCenter());
      const notification = makeNotification({ id: "n-2", isRead: true });

      act(() => result.current.handleMarkRead(notification));

      expect(markReadMutateMock).not.toHaveBeenCalled();
    });
  });

  it("unreadCount를 반환한다", () => {
    useNotificationListMock.mockReturnValue({
      notifications: [makeNotification()],
      unreadCount: 5,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isPending: false,
    });

    const { result } = renderHook(() => useNotificationCenter());

    expect(result.current.unreadCount).toBe(5);
  });
});
