const fetchTermsMock = vi.fn();
const fetchPrivacyMock = vi.fn();

vi.mock("./legal-document.api", () => ({
  fetchTerms: (...args: unknown[]) => fetchTermsMock(...args),
  fetchPrivacy: (...args: unknown[]) => fetchPrivacyMock(...args),
}));

const { legalDocumentQueries } = await import("./legal-document.queries");

describe("legalDocumentQueries", () => {
  describe("queryKey structure", () => {
    it("all() returns base key", () => {
      expect(legalDocumentQueries.all()).toEqual(["legal-documents"]);
    });

    it("terms() includes 'terms' in key", () => {
      expect(legalDocumentQueries.terms().queryKey).toEqual(["legal-documents", "terms"]);
    });

    it("privacy() includes 'privacy' in key", () => {
      expect(legalDocumentQueries.privacy().queryKey).toEqual(["legal-documents", "privacy"]);
    });
  });

  describe("queryFn delegation", () => {
    it("terms queryFn calls fetchTerms", () => {
      const opts = legalDocumentQueries.terms();

      opts.queryFn({
        queryKey: opts.queryKey,
        signal: new AbortController().signal,
        meta: undefined,
      });

      expect(fetchTermsMock).toHaveBeenCalled();
    });

    it("privacy queryFn calls fetchPrivacy", () => {
      const opts = legalDocumentQueries.privacy();

      opts.queryFn({
        queryKey: opts.queryKey,
        signal: new AbortController().signal,
        meta: undefined,
      });

      expect(fetchPrivacyMock).toHaveBeenCalled();
    });
  });

  describe("staleTime configuration", () => {
    it("terms has 5min staleTime (SLOW)", () => {
      expect(legalDocumentQueries.terms().staleTime).toBe(300_000);
    });

    it("privacy has 5min staleTime (SLOW)", () => {
      expect(legalDocumentQueries.privacy().staleTime).toBe(300_000);
    });
  });
});
