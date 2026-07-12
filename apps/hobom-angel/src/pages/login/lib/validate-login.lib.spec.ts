import { describe, expect, it } from "vitest";
import { validateLogin } from "./validate-login.lib";

describe("validateLogin", () => {
  it("passes for a well-formed email and a non-empty password", () => {
    expect(validateLogin({ email: "hobom@example.com", password: "secret" })).toEqual({});
  });

  it("requires the email", () => {
    expect(validateLogin({ email: "  ", password: "secret" }).email).toBe("이메일을 입력해주세요.");
  });

  it("rejects a malformed email", () => {
    expect(validateLogin({ email: "hobom@", password: "secret" }).email).toBe(
      "올바른 이메일 형식이 아니에요.",
    );
    expect(validateLogin({ email: "hobom.com", password: "secret" }).email).toBe(
      "올바른 이메일 형식이 아니에요.",
    );
  });

  it("requires the password", () => {
    expect(validateLogin({ email: "hobom@example.com", password: "" }).password).toBe(
      "비밀번호를 입력해주세요.",
    );
  });

  it("reports both fields when both are missing", () => {
    const errors = validateLogin({ email: "", password: "" });

    expect(Object.keys(errors)).toEqual(["email", "password"]);
  });
});
