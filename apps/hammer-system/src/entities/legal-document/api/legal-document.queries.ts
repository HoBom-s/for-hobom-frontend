import { queryOptions } from "hobom-data";
import { CACHE_PROFILE } from "@/shared/config";
import { fetchTerms, fetchPrivacy } from "./legal-document.api";

export const legalDocumentQueries = {
  all: () => ["legal-documents"],

  terms: () =>
    queryOptions({
      queryKey: ["legal-documents", "terms"],
      queryFn: fetchTerms,
      ...CACHE_PROFILE.SLOW,
    }),

  privacy: () =>
    queryOptions({
      queryKey: ["legal-documents", "privacy"],
      queryFn: fetchPrivacy,
      ...CACHE_PROFILE.SLOW,
    }),
} as const;
