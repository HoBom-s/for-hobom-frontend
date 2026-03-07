import { describe, it, expect } from "vitest";
import { filterColumnsByEpic, buildSwimlaneGroups } from "./kanban-filter.lib";
import type { IssueType, IssueTreeResult } from "@/entities/issue";
import type { ColumnMap } from "./kanban-dnd.lib";

const makeIssue = (id: string, overrides: Partial<IssueType> = {}): IssueType =>
  ({
    id,
    issueKey: `KEY-${id}`,
    title: `Issue ${id}`,
    type: "TASK",
    status: "TODO",
    priority: "MEDIUM",
    ...overrides,
  }) as IssueType;

describe("filterColumnsByEpic", () => {
  it("에픽 자신과 하위 이슈만 필터링한다", () => {
    const epic = makeIssue("epic1", { type: "EPIC" });
    const child = makeIssue("child1");
    const unrelated = makeIssue("other");

    const columns: ColumnMap = {
      TODO: [epic, child, unrelated],
    };

    const parentMap = new Map<string, IssueType>();
    parentMap.set("child1", epic);

    const result = filterColumnsByEpic(columns, "epic1", parentMap);

    expect(result.TODO).toHaveLength(2);
    expect(result.TODO.map((i) => i.id)).toEqual(["epic1", "child1"]);
  });

  it("매칭되는 이슈가 없으면 빈 배열을 반환한다", () => {
    const columns: ColumnMap = {
      TODO: [makeIssue("other")],
    };

    const result = filterColumnsByEpic(
      columns,
      "nonexistent",
      new Map<string, IssueType>(),
    );

    expect(result.TODO).toHaveLength(0);
  });
});

describe("buildSwimlaneGroups", () => {
  it("에픽별로 스윔레인 그룹을 생성한다", () => {
    const epic = makeIssue("epic1", {
      type: "EPIC",
      issueKey: "KEY-1",
      title: "My Epic",
    });
    const task = makeIssue("task1");

    const issueTree: IssueTreeResult = {
      parentMap: new Map<string, IssueType>([["task1", epic]]),
      childrenMap: new Map([["epic1", [task]]]),
    };

    const result = buildSwimlaneGroups(
      [epic, task],
      issueTree,
      new Set<string>(),
    );

    expect(result).toHaveLength(1);
    expect(result[0].epicId).toBe("epic1");
    expect(result[0].epicTitle).toBe("My Epic");
  });

  it("에픽이 없는 이슈는 '에픽 없음' 그룹으로 분류한다", () => {
    const task = makeIssue("task1");

    const issueTree: IssueTreeResult = {
      parentMap: new Map<string, IssueType>(),
      childrenMap: new Map(),
    };

    const result = buildSwimlaneGroups([task], issueTree, new Set<string>());

    expect(result).toHaveLength(1);
    expect(result[0].epicId).toBeNull();
    expect(result[0].epicTitle).toBe("에픽 없음");
  });

  it("에픽 없음 그룹은 항상 마지막에 정렬된다", () => {
    const epic = makeIssue("epic1", {
      type: "EPIC",
      issueKey: "KEY-1",
      title: "Epic",
    });
    const orphan = makeIssue("task1");

    const issueTree: IssueTreeResult = {
      parentMap: new Map<string, IssueType>(),
      childrenMap: new Map(),
    };

    const result = buildSwimlaneGroups(
      [orphan, epic],
      issueTree,
      new Set<string>(),
    );

    expect(result[result.length - 1].epicId).toBeNull();
  });

  it("이슈가 없으면 빈 배열을 반환한다", () => {
    const issueTree: IssueTreeResult = {
      parentMap: new Map<string, IssueType>(),
      childrenMap: new Map(),
    };

    const result = buildSwimlaneGroups([], issueTree, new Set<string>());
    expect(result).toHaveLength(0);
  });
});
