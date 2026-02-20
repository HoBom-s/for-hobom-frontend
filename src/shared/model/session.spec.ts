import { getHoBomAccessToken, saveHoBomAccessToken } from "./session";

describe("session", () => {
  let storageData: Record<string, string>;

  beforeEach(() => {
    storageData = {};
    vi.stubGlobal("sessionStorage", {
      getItem: vi.fn((key: string) => storageData[key] ?? null),
      setItem: vi.fn((key: string, value: string) => {
        storageData[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete storageData[key];
      }),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("saveHoBomAccessToken", () => {
    it("saves the token under 'accessToken' key", () => {
      saveHoBomAccessToken("my-token");
      expect(storageData["accessToken"]).toBe("my-token");
    });

    it("overwrites a previously saved token", () => {
      saveHoBomAccessToken("token-v1");
      saveHoBomAccessToken("token-v2");
      expect(storageData["accessToken"]).toBe("token-v2");
    });

    it("throws when null is passed", () => {
      expect(() =>
        saveHoBomAccessToken(null as unknown as string),
      ).toThrow("Token must be exist");
    });
  });

  describe("getHoBomAccessToken", () => {
    it("returns null when no token has been saved", () => {
      expect(getHoBomAccessToken()).toBeNull();
    });

    it("returns the token that was saved", () => {
      saveHoBomAccessToken("abc-123");
      expect(getHoBomAccessToken()).toBe("abc-123");
    });
  });
});
