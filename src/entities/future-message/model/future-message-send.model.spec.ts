import { describe, it, expect } from "vitest";
import { FutureMessageSendSchema } from "./future-message-send.model";

const makeValidInput = () => ({
  recipientId: "user-1",
  title: "제목",
  content: "내용",
  scheduledAt: "2026-03-10T09:00:00",
});

describe("FutureMessageSendSchema", () => {
  it("유효한 객체는 safeParse에 성공한다", () => {
    const result = FutureMessageSendSchema.safeParse(makeValidInput());
    expect(result.success).toBe(true);
  });

  it("빈 recipientId는 safeParse에 실패한다", () => {
    const result = FutureMessageSendSchema.safeParse({
      ...makeValidInput(),
      recipientId: "",
    });
    expect(result.success).toBe(false);
  });

  it("빈 title은 safeParse에 실패한다", () => {
    const result = FutureMessageSendSchema.safeParse({
      ...makeValidInput(),
      title: "",
    });
    expect(result.success).toBe(false);
  });

  it("빈 content는 safeParse에 실패한다", () => {
    const result = FutureMessageSendSchema.safeParse({
      ...makeValidInput(),
      content: "",
    });
    expect(result.success).toBe(false);
  });

  it("빈 scheduledAt은 safeParse에 실패한다", () => {
    const result = FutureMessageSendSchema.safeParse({
      ...makeValidInput(),
      scheduledAt: "",
    });
    expect(result.success).toBe(false);
  });

  it("필수 필드가 누락되면 safeParse에 실패한다", () => {
    const result = FutureMessageSendSchema.safeParse({
      recipientId: "user-1",
      title: "제목",
    });
    expect(result.success).toBe(false);
  });
});
