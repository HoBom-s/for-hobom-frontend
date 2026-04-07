const postCreateMock = vi.fn();

vi.mock("./legal-document.api", () => ({
  postCreateLegalDocument: (...args: unknown[]) => postCreateMock(...args),
}));

const { legalDocumentMutations } = await import("./legal-document.mutations");

describe("legalDocumentMutations", () => {
  describe("mutationKey structure", () => {
    it("all() returns base key", () => {
      expect(legalDocumentMutations.all()).toEqual(["legal-documents"]);
    });

    it("create() key extends base", () => {
      expect(legalDocumentMutations.create().mutationKey).toEqual([
        "legal-documents",
        "create",
      ]);
    });
  });

  describe("mutationFn delegation", () => {
    it("create delegates to postCreateLegalDocument", () => {
      const data = {
        type: 2 as const,
        version: "2.0",
        effectiveDate: "2026-05-01",
        content: "# Privacy Policy",
      };

      legalDocumentMutations.create().mutationFn(data);

      expect(postCreateMock).toHaveBeenCalledWith(data);
    });
  });
});
