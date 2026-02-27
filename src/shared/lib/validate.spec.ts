import { z } from "zod";
import { handleValidationResult, validateWithZod } from "./validate.lib";

const TestSchema = z.object({
  name: z.string().min(1),
  age: z.number().positive(),
});

describe("validateWithZod", () => {
  it("returns parsed data on valid input", () => {
    const result = validateWithZod(TestSchema)({ name: "Alice", age: 30 });
    expect(result).toEqual({ name: "Alice", age: 30 });
  });

  it("returns Error when a required field is missing", () => {
    const result = validateWithZod(TestSchema)({ name: "Alice" });
    expect(result).toBeInstanceOf(Error);
  });

  it("returns Error when a field fails its constraint", () => {
    const result = validateWithZod(TestSchema)({ name: "", age: 30 });
    expect(result).toBeInstanceOf(Error);
  });

  it("returns Error with a non-empty message when multiple fields are invalid", () => {
    const result = validateWithZod(TestSchema)({ name: "", age: -1 });
    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message.length).toBeGreaterThan(0);
  });

  it("returns Error for completely wrong input type", () => {
    const result = validateWithZod(TestSchema)(null);
    expect(result).toBeInstanceOf(Error);
  });
});

describe("handleValidationResult", () => {
  it("calls onError and not onSuccess when result is an Error", () => {
    const onError = vi.fn();
    const onSuccess = vi.fn();
    const err = new Error("something went wrong");

    handleValidationResult(err, onError, onSuccess);

    expect(onError).toHaveBeenCalledOnce();
    expect(onError).toHaveBeenCalledWith(err);
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it("calls onSuccess and not onError when result is a value", () => {
    const onError = vi.fn();
    const onSuccess = vi.fn();

    handleValidationResult({ name: "Alice", age: 30 }, onError, onSuccess);

    expect(onSuccess).toHaveBeenCalledOnce();
    expect(onSuccess).toHaveBeenCalledWith({ name: "Alice", age: 30 });
    expect(onError).not.toHaveBeenCalled();
  });

  it("calls onSuccess for primitive values (string, number)", () => {
    const onSuccess = vi.fn();
    handleValidationResult("ok", vi.fn(), onSuccess);
    expect(onSuccess).toHaveBeenCalledWith("ok");

    handleValidationResult(42, vi.fn(), onSuccess);
    expect(onSuccess).toHaveBeenCalledWith(42);
  });
});
