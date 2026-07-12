import { maskEmail } from "./maskEmail";

describe("maskEmail()", () => {
  test("keeps the first local character and the domain", () => {
    expect(maskEmail("foxmon1524@gmail.com")).toBe("f*********@gmail.com");
    expect(maskEmail("ab@hobom.io")).toBe("a*@hobom.io");
  });

  test("masks a single-character local part", () => {
    expect(maskEmail("a@hobom.io")).toBe("*@hobom.io");
  });

  test("fully masks input without a usable local part", () => {
    expect(maskEmail("@hobom.io")).toBe("*********");
    expect(maskEmail("not-an-email")).toBe("************");
    expect(maskEmail("")).toBe("*");
  });
});
