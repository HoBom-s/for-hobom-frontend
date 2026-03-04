import { CreateCommentSchema } from "./wiki-comment.schema";

describe("CreateCommentSchema", () => {
  it("parses valid content", () => {
    const result = CreateCommentSchema.safeParse({ content: "댓글" });
    expect(result.success).toBe(true);
  });

  it("rejects empty content", () => {
    const result = CreateCommentSchema.safeParse({ content: "" });
    expect(result.success).toBe(false);
  });

  it("rejects content over 2000 chars", () => {
    const result = CreateCommentSchema.safeParse({
      content: "a".repeat(2001),
    });
    expect(result.success).toBe(false);
  });

  it("allows optional parentCommentId", () => {
    const result = CreateCommentSchema.safeParse({
      content: "reply",
      parentCommentId: "parent-1",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.parentCommentId).toBe("parent-1");
    }
  });

  it("allows null parentCommentId", () => {
    const result = CreateCommentSchema.safeParse({
      content: "root comment",
      parentCommentId: null,
    });
    expect(result.success).toBe(true);
  });
});
