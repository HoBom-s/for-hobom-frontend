import { createFunnelStateId, createFunnelStorage } from "./funnel";

describe("createFunnelStateId", () => {
  it("prefixes the id with funnel-state-id__", () => {
    expect(createFunnelStateId("my-funnel")).toBe("funnel-state-id__my-funnel");
  });

  it("appends the full id string including slashes", () => {
    expect(createFunnelStateId("/send?step=1")).toBe(
      "funnel-state-id__/send?step=1",
    );
  });
});

describe("createFunnelStorage (sessionStorage)", () => {
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

  const id = createFunnelStateId("test");

  it("get() returns null when nothing is stored", async () => {
    const s = createFunnelStorage(id);
    expect(await s.get()).toBeNull();
  });

  it("get() returns parsed object after set()", async () => {
    const s = createFunnelStorage(id);
    await s.set({ step: "confirm" });
    expect(await s.get()).toEqual({ step: "confirm" });
  });

  it("set() persists value as JSON string", async () => {
    const s = createFunnelStorage(id);
    await s.set({ name: "Alice", age: 30 });
    expect(storageData[id]).toBe(JSON.stringify({ name: "Alice", age: 30 }));
  });

  it("clear() removes the key from storage", async () => {
    const s = createFunnelStorage(id);
    await s.set({ step: "1" });
    await s.clear();
    expect(await s.get()).toBeNull();
  });

  it("throws for unsupported storageType", () => {
    expect(() => createFunnelStorage(id, "localStorage")).toThrow();
  });
});
