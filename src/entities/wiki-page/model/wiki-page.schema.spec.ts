import { UpdatePageSchema } from "./wiki-page.schema";

describe("UpdatePageSchema", () => {
  it("parses valid input", () => {
    const result = UpdatePageSchema.safeParse({
      title: "제목",
      content: "<p>내용</p>",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty title", () => {
    const result = UpdatePageSchema.safeParse({ title: "", content: "x" });
    expect(result.success).toBe(false);
  });

  it("rejects title over 200 chars", () => {
    const result = UpdatePageSchema.safeParse({
      title: "a".repeat(201),
      content: "x",
    });
    expect(result.success).toBe(false);
  });

  it("allows empty content", () => {
    const result = UpdatePageSchema.safeParse({ title: "제목", content: "" });
    expect(result.success).toBe(true);
  });
});
