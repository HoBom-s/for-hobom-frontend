import { isPendingMessageSendStatus } from "./future-message-send-status.model";

describe("isPendingMessageSendStatus", () => {
  it("returns true for PENDING", () => {
    expect(isPendingMessageSendStatus("PENDING")).toBe(true);
  });

  it("returns false for SENT", () => {
    expect(isPendingMessageSendStatus("SENT")).toBe(false);
  });
});
