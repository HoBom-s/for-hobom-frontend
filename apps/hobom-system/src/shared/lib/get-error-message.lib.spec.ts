import { describe, it, expect } from "vitest";
import { getErrorMessage } from "./get-error-message.lib";
import { HttpError } from "../api/http-error.api";

const FALLBACK = "기본 에러 메시지";

describe("getErrorMessage", () => {
  it("TypeError이면 네트워크 에러 메시지를 반환한다", () => {
    const error = new TypeError("Failed to fetch");

    expect(getErrorMessage(error, FALLBACK)).toBe("네트워크 연결을 확인해주세요.");
  });

  it("AbortError이면 타임아웃 메시지를 반환한다", () => {
    const error = new DOMException("The operation was aborted.", "AbortError");

    expect(getErrorMessage(error, FALLBACK)).toBe("요청 시간이 초과했어요.");
  });

  it("HTTP 403이면 권한 없음 메시지를 반환한다", () => {
    const error = new HttpError(403, "Forbidden");

    expect(getErrorMessage(error, FALLBACK)).toBe("권한이 없어요.");
  });

  it("HTTP 500이면 서버 오류 메시지를 반환한다", () => {
    const error = new HttpError(500, "Internal Server Error");

    expect(getErrorMessage(error, FALLBACK)).toBe("서버 오류가 발생했어요.");
  });

  it("HTTP 502도 서버 오류 메시지를 반환한다", () => {
    const error = new HttpError(502);

    expect(getErrorMessage(error, FALLBACK)).toBe("서버 오류가 발생했어요.");
  });

  it("HttpError에 serverMessage가 있으면 서버 메시지를 반환한다", () => {
    const error = new HttpError(409, "이미 존재하는 항목이에요.");

    expect(getErrorMessage(error, FALLBACK)).toBe("이미 존재하는 항목이에요.");
  });

  it("HttpError에 serverMessage가 없으면 fallback을 반환한다", () => {
    const error = new HttpError(400);

    expect(getErrorMessage(error, FALLBACK)).toBe(FALLBACK);
  });

  it("알 수 없는 에러이면 fallback을 반환한다", () => {
    const error = new Error("unknown");

    expect(getErrorMessage(error, FALLBACK)).toBe(FALLBACK);
  });

  it("null 에러이면 fallback을 반환한다", () => {
    expect(getErrorMessage(null, FALLBACK)).toBe(FALLBACK);
  });
});
