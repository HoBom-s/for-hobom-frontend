import { describe, it, expect } from "vitest";
import { HttpError } from "./http-error.api";

describe("HttpError", () => {
  it("status와 name이 올바르게 설정된다", () => {
    const error = new HttpError(404);

    expect(error.status).toBe(404);
    expect(error.name).toBe("HttpError");
  });

  it("serverMessage가 있으면 Error.message로 사용한다", () => {
    const error = new HttpError(400, "잘못된 요청");

    expect(error.message).toBe("잘못된 요청");
    expect(error.serverMessage).toBe("잘못된 요청");
  });

  it("serverMessage가 없으면 기본 메시지를 생성한다", () => {
    const error = new HttpError(500);

    expect(error.message).toBe("HTTP error! status: 500");
    expect(error.serverMessage).toBeUndefined();
  });

  it("Error를 상속한다", () => {
    const error = new HttpError(401);

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(HttpError);
  });
});
