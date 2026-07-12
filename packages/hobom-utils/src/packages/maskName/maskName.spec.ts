import { maskName } from "./maskName";

describe("maskName()", () => {
  test("keeps the first and last character, masking the middle", () => {
    expect(maskName("홍길동")).toBe("홍*동");
    expect(maskName("남궁민수")).toBe("남**수");
  });

  test("masks only the second character for a two-character name", () => {
    expect(maskName("김철")).toBe("김*");
  });

  test("masks a single-character name entirely", () => {
    expect(maskName("A")).toBe("*");
  });

  test("returns an empty string for empty input", () => {
    expect(maskName("")).toBe("");
  });

  test("counts by code point (no surrogate splitting)", () => {
    expect(maskName("🙂😀😉")).toBe("🙂*😉");
  });
});
