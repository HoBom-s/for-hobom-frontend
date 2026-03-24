import { describe, it, expect } from "vitest";
import { HttpError } from "../api/http-error.api";
import { getErrorMessage } from "./get-error-message.lib";

describe("getErrorMessage", () => {
  const FALLBACK = "알 수 없는 오류";

  it("TypeError이면 네트워크 에러 메시지를 반환한다", () => {
    expect(getErrorMessage(new TypeError("Failed to fetch"), FALLBACK)).toBe(
      "네트워크 연결을 확인해주세요.",
    );
  });

  it("AbortError이면 타임아웃 메시지를 반환한다", () => {
    const error = new DOMException("signal is aborted", "AbortError");

    expect(getErrorMessage(error, FALLBACK)).toBe("요청 시간이 초과했어요.");
  });

  it("HttpError 403이면 권한 없음 메시지를 반환한다", () => {
    expect(getErrorMessage(new HttpError(403), FALLBACK)).toBe("권한이 없어요.");
  });

  it("HttpError 500 이상이면 서버 오류 메시지를 반환한다", () => {
    expect(getErrorMessage(new HttpError(500), FALLBACK)).toBe("서버 오류가 발생했어요.");
    expect(getErrorMessage(new HttpError(502), FALLBACK)).toBe("서버 오류가 발생했어요.");
  });

  it("HttpError에 serverMessage가 있으면 그 메시지를 반환한다", () => {
    expect(getErrorMessage(new HttpError(400, "잘못된 요청입니다"), FALLBACK)).toBe(
      "잘못된 요청입니다",
    );
  });

  it("HttpError에 serverMessage가 없는 4xx이면 fallback을 반환한다", () => {
    expect(getErrorMessage(new HttpError(404), FALLBACK)).toBe(FALLBACK);
  });

  it("일반 Error이면 fallback을 반환한다", () => {
    expect(getErrorMessage(new Error("unknown"), FALLBACK)).toBe(FALLBACK);
  });

  it("문자열이면 fallback을 반환한다", () => {
    expect(getErrorMessage("random string", FALLBACK)).toBe(FALLBACK);
  });

  it("null/undefined이면 fallback을 반환한다", () => {
    expect(getErrorMessage(null, FALLBACK)).toBe(FALLBACK);
    expect(getErrorMessage(undefined, FALLBACK)).toBe(FALLBACK);
  });
});
