import { useSuspenseQueries } from "hobom-data";
import { legalDocumentQueries } from "@/entities/legal-document";

export const useLegalDocumentList = () => {
  const [termsResult, privacyResult] = useSuspenseQueries({
    queries: [legalDocumentQueries.terms(), legalDocumentQueries.privacy()],
  });

  return {
    terms: termsResult.data,
    privacy: privacyResult.data,
  };
};
