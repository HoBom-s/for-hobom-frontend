import { maskPhone } from "./maskPhone";

describe("maskPhone()", () => {
  test("masks the middle of an 11-digit mobile number", () => {
    expect(maskPhone("01012341234")).toBe("010-****-1234");
    expect(maskPhone("010-1234-1234")).toBe("010-****-1234");
  });

  test("strips separators and spaces before masking", () => {
    expect(maskPhone("010 1234 1234")).toBe("010-****-1234");
    expect(maskPhone("+82 10-1234-1234")).toBe("821-*****-1234");
  });

  test("keeps prefix + last four for a 10-digit number", () => {
    expect(maskPhone("0212345678")).toBe("021-***-5678");
  });

  test("fully masks numbers shorter than seven digits", () => {
    expect(maskPhone("12345")).toBe("*****");
    expect(maskPhone("")).toBe("*");
  });
});
