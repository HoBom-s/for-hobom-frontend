import { describe, expect, it, vi } from "vitest";
import { Mutation } from "./mutation";

describe("Mutation", () => {
  it("초기 상태가 idle이다", () => {
    const mutation = new Mutation({
      mutationFn: vi.fn(),
    });

    expect(mutation.getState().status).toBe("idle");
    expect(mutation.getState().data).toBeUndefined();
    expect(mutation.getState().error).toBeNull();
  });

  it("execute 성공 시 status가 success가 된다", async () => {
    const mutation = new Mutation({
      mutationFn: async (name: string) => `Hello ${name}`,
    });

    const result = await mutation.execute("World");

    expect(result).toBe("Hello World");
    expect(mutation.getState().status).toBe("success");
    expect(mutation.getState().data).toBe("Hello World");
    expect(mutation.getState().variables).toBe("World");
  });

  it("execute 실패 시 status가 error가 된다", async () => {
    const error = new Error("fail");
    const mutation = new Mutation({
      mutationFn: () => Promise.reject(error),
    });

    await expect(mutation.execute(undefined)).rejects.toThrow("fail");
    expect(mutation.getState().status).toBe("error");
    expect(mutation.getState().error).toBe(error);
  });

  it("라이프사이클 콜백을 호출한다 (성공)", async () => {
    const onMutate = vi.fn().mockResolvedValue("context");
    const onSuccess = vi.fn();
    const onSettled = vi.fn();

    const mutation = new Mutation({
      mutationFn: async (v: string) => v.toUpperCase(),
      onMutate,
      onSuccess,
      onSettled,
    });

    await mutation.execute("hello");

    expect(onMutate).toHaveBeenCalledWith("hello");
    expect(onSuccess).toHaveBeenCalledWith("HELLO", "hello", "context");
    expect(onSettled).toHaveBeenCalledWith("HELLO", null, "hello", "context");
  });

  it("라이프사이클 콜백을 호출한다 (실패)", async () => {
    const error = new Error("fail");
    const onMutate = vi.fn().mockResolvedValue("ctx");
    const onError = vi.fn();
    const onSettled = vi.fn();

    const mutation = new Mutation({
      mutationFn: () => Promise.reject(error),
      onMutate,
      onError,
      onSettled,
    });

    await expect(mutation.execute(undefined)).rejects.toThrow("fail");

    expect(onError).toHaveBeenCalledWith(error, undefined, "ctx");
    expect(onSettled).toHaveBeenCalledWith(undefined, error, undefined, "ctx");
  });
});
