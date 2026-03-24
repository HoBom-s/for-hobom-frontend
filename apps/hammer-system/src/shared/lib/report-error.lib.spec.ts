// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { HttpError } from "../api/http-error.api";

const captureErrorMock = vi.fn();

vi.mock("../api/error-capture.api", () => ({
  captureError: (...args: unknown[]) => captureErrorMock(...args),
}));

const { reportError } = await import("./report-error.lib");

describe("reportError", () => {
  beforeEach(() => {
    captureErrorMock.mockReset();
    captureErrorMock.mockResolvedValue(undefined);
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("console.error를 호출한다", () => {
    const error = new Error("test");

    reportError(error);

    expect(console.error).toHaveBeenCalledWith(error, undefined);
  });

  it("errorInfo를 함께 전달한다", () => {
    const error = new Error("test");
    const info = { componentStack: "stack" };

    reportError(error, info);

    expect(console.error).toHaveBeenCalledWith(error, info);
  });

  it("HttpError이면 errorType이 SERVER_RESPONSE이다", () => {
    reportError(new HttpError(500, "서버 에러"));

    expect(captureErrorMock).toHaveBeenCalledWith(
      expect.objectContaining({ errorType: "SERVER_RESPONSE" }),
    );
  });

  it("일반 Error이면 errorType이 CLIENT_LOGIC이다", () => {
    reportError(new Error("client error"));

    expect(captureErrorMock).toHaveBeenCalledWith(
      expect.objectContaining({ errorType: "CLIENT_LOGIC" }),
    );
  });

  it("captureError가 실패해도 throw하지 않는다", () => {
    captureErrorMock.mockRejectedValue(new Error("network failure"));

    expect(() => reportError(new Error("test"))).not.toThrow();
  });
});
