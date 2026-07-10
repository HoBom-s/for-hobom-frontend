import type { CommentType } from "@/entities/wiki-comment";
import { buildCommentTree } from "./build-comment-tree.lib";

const makeComment = (overrides: Partial<CommentType> & Pick<CommentType, "id">): CommentType => ({
  pageId: "page-1",
  parentCommentId: null,
  content: "test",
  author: null,
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
  ...overrides,
});

describe("buildCommentTree", () => {
  it("returns empty array for empty input", () => {
    expect(buildCommentTree([])).toEqual([]);
  });

  it("returns all as roots when no parent references", () => {
    const comments = [
      makeComment({ id: "1", content: "first" }),
      makeComment({ id: "2", content: "second" }),
    ];

    const tree = buildCommentTree(comments);

    expect(tree).toHaveLength(2);
    expect(tree[0]?.id).toBe("1");
    expect(tree[1]?.id).toBe("2");
    expect(tree[0]?.children).toEqual([]);
  });

  it("nests child comments under parent", () => {
    const comments = [
      makeComment({ id: "1" }),
      makeComment({ id: "2", parentCommentId: "1" }),
      makeComment({ id: "3", parentCommentId: "1" }),
    ];

    const tree = buildCommentTree(comments);

    expect(tree).toHaveLength(1);
    expect(tree[0]?.children).toHaveLength(2);
    expect(tree[0]?.children[0]?.id).toBe("2");
    expect(tree[0]?.children[1]?.id).toBe("3");
  });

  it("supports multi-level nesting", () => {
    const comments = [
      makeComment({ id: "1" }),
      makeComment({ id: "2", parentCommentId: "1" }),
      makeComment({ id: "3", parentCommentId: "2" }),
    ];

    const tree = buildCommentTree(comments);

    expect(tree).toHaveLength(1);
    expect(tree[0]?.children[0]?.children[0]?.id).toBe("3");
  });

  it("treats orphan comments (missing parent) as roots", () => {
    const comments = [
      makeComment({ id: "1", parentCommentId: "deleted-parent" }),
      makeComment({ id: "2" }),
    ];

    const tree = buildCommentTree(comments);

    expect(tree).toHaveLength(2);
    expect(tree[0]?.id).toBe("1");
    expect(tree[1]?.id).toBe("2");
  });

  it("preserves comment data in tree nodes", () => {
    const comments = [makeComment({ id: "1", content: "hello", author: "Alice" })];

    const tree = buildCommentTree(comments);

    expect(tree[0]?.content).toBe("hello");
    expect(tree[0]?.author).toBe("Alice");
    expect(tree[0]?.children).toEqual([]);
  });
});
