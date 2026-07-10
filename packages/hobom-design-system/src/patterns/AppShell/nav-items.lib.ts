import type { ReactNode } from "react";
import { Bom } from "hobom-utils";

export interface AppShellNavItem {
  /** 네비게이션 아이템의 고유 식별자. 활성 상태 판별에 사용. */
  value: string;
  /** 사이드바에 표시할 텍스트. 접힘 모드에서는 Tooltip으로 표시. */
  label: string;
  /** 클릭 시 이동할 경로. `location.pathname.startsWith(path)`로 활성 상태 판별. */
  path: string;
  icon: ReactNode;
  /** 접이식 서브 메뉴 아이템. 부모 아이템 클릭 시 토글. */
  children?: AppShellNavItem[];
}

/** 섹션 헤더로 그룹화된 네비게이션 아이템 모음. */
export interface AppShellNavSection {
  /** 섹션 고유 키. */
  section: string;
  /** 사이드바에 표시할 섹션 헤더 텍스트. */
  label: string;
  /** 이 섹션에 속하는 아이템 목록. */
  items: AppShellNavItem[];
}

/** 독립 아이템 또는 섹션. navItems prop의 엘리먼트 타입. */
export type NavEntry = AppShellNavItem | AppShellNavSection;

export const isSection = (entry: NavEntry): entry is AppShellNavSection => "items" in entry;

/** children 포함 전체 아이템을 1차원 배열로 펼친다. */
export const flattenNavItems = (items: AppShellNavItem[]): AppShellNavItem[] =>
  items.flatMap((item) => (item.children ? [item, ...item.children] : [item]));

/** NavEntry[]에서 모든 AppShellNavItem을 1차원 배열로 추출한다. */
export const flattenNavEntries = (entries: NavEntry[]): AppShellNavItem[] =>
  entries.flatMap((entry) =>
    isSection(entry) ? flattenNavItems(entry.items) : flattenNavItems([entry]),
  );

/** navItems의 첫 아이템(섹션이면 그 첫 아이템)을 활성 아이템 fallback으로 쓴다. */
const firstNavItem = (entries: NavEntry[]): AppShellNavItem | undefined => {
  const first = entries[0];

  return first && isSection(first) ? first.items[0] : first;
};

/**
 * 현재 경로와 가장 긴 prefix로 매칭되는 아이템을 활성 아이템으로 고른다.
 * 매칭이 없으면 첫 아이템으로 fallback.
 */
export const resolveActiveItem = (
  entries: NavEntry[],
  bottomItems: AppShellNavItem[] | undefined,
  pathname: string,
): AppShellNavItem | undefined =>
  Bom.pipe(
    [...flattenNavEntries(entries), ...flattenNavItems(bottomItems ?? [])],
    Bom.sortBy((item) => -item.path.length),
    (items) => items.find((item) => pathname.startsWith(item.path)),
    Bom.when(Bom.isNullish, () => firstNavItem(entries)),
  );
