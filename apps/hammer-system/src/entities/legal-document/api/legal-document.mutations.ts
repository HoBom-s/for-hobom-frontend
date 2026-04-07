import { mutationOptions } from "hobom-data";
import { postCreateLegalDocument } from "./legal-document.api";

export const legalDocumentMutations = {
  all: () => ["legal-documents"] as const,

  create: () =>
    mutationOptions({
      mutationKey: [...legalDocumentMutations.all(), "create"] as const,
      mutationFn: postCreateLegalDocument,
    }),
} as const;
