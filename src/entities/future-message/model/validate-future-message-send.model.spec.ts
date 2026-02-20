import { validateFutureMessageSendInput } from "./validate-future-message-send.model";

const validInput = {
  recipientId: "user-123",
  title: "안녕",
  content: "미래의 나에게",
  scheduledAt: "2030-01-01",
};

describe("validateFutureMessageSendInput", () => {
  it("returns typed data on valid input", () => {
    const result = validateFutureMessageSendInput(validInput);
    expect(result).toEqual(validInput);
  });

  it("returns Error when recipientId is empty string", () => {
    const result = validateFutureMessageSendInput({
      ...validInput,
      recipientId: "",
    });
    expect(result).toBeInstanceOf(Error);
  });

  it("returns Error when title is empty string", () => {
    const result = validateFutureMessageSendInput({
      ...validInput,
      title: "",
    });
    expect(result).toBeInstanceOf(Error);
  });

  it("returns Error when content is empty string", () => {
    const result = validateFutureMessageSendInput({
      ...validInput,
      content: "",
    });
    expect(result).toBeInstanceOf(Error);
  });

  it("returns Error when scheduledAt is empty string", () => {
    const result = validateFutureMessageSendInput({
      ...validInput,
      scheduledAt: "",
    });
    expect(result).toBeInstanceOf(Error);
  });

  it("returns Error when all required fields are missing", () => {
    const result = validateFutureMessageSendInput({});
    expect(result).toBeInstanceOf(Error);
  });

  it("returns Error for non-object input", () => {
    const result = validateFutureMessageSendInput(null);
    expect(result).toBeInstanceOf(Error);
  });
});
