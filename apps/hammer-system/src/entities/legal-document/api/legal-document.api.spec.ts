const mockGet = vi.fn();
const mockPost = vi.fn();

vi.mock("@/shared/api", () => ({
  userHttpClient: {
    get: (...args: unknown[]) => mockGet(...args),
    post: (...args: unknown[]) => mockPost(...args),
  },
}));

const { fetchTerms, fetchPrivacy, postCreateLegalDocument } = await import("./legal-document.api");

describe("legal-document API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetchTerms calls GET /legal/terms", () => {
    fetchTerms();

    expect(mockGet).toHaveBeenCalledWith("/legal/terms");
  });

  it("fetchPrivacy calls GET /legal/privacy", () => {
    fetchPrivacy();

    expect(mockGet).toHaveBeenCalledWith("/legal/privacy");
  });

  it("postCreateLegalDocument calls POST /internal/legal with body", () => {
    const data = {
      type: 1 as const,
      version: "1.0",
      effectiveDate: "2026-04-01",
      content: "# Terms of Service",
    };

    postCreateLegalDocument(data);

    expect(mockPost).toHaveBeenCalledWith("/internal/legal", data);
  });
});
