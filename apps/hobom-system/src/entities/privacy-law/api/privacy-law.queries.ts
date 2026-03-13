import { queryOptions } from "@tanstack/react-query";
import { CACHE_PROFILE } from "@/shared/config";
import {
  fetchVersions,
  fetchVersionById,
  fetchDiffs,
  fetchDiffById,
  fetchStudyMaterials,
  fetchStudyMaterialById,
  fetchQuestionHistory,
  fetchExams,
  fetchExamById,
} from "./privacy-law.api";

export const privacyLawQueries = {
  all: () => ["privacy-law"],

  versions: () =>
    queryOptions({
      queryKey: ["privacy-law", "versions"] as const,
      queryFn: fetchVersions,
      ...CACHE_PROFILE.SLOW,
    }),

  version: (id: string) =>
    queryOptions({
      queryKey: ["privacy-law", "versions", id] as const,
      queryFn: () => fetchVersionById({ id }),
      ...CACHE_PROFILE.SLOW,
    }),

  diffs: () =>
    queryOptions({
      queryKey: ["privacy-law", "diffs"] as const,
      queryFn: fetchDiffs,
      ...CACHE_PROFILE.SLOW,
    }),

  diff: (id: string) =>
    queryOptions({
      queryKey: ["privacy-law", "diffs", id] as const,
      queryFn: () => fetchDiffById({ id }),
      ...CACHE_PROFILE.SLOW,
    }),

  studyMaterials: () =>
    queryOptions({
      queryKey: ["privacy-law", "study-materials"] as const,
      queryFn: fetchStudyMaterials,
      ...CACHE_PROFILE.SLOW,
    }),

  studyMaterial: (id: string) =>
    queryOptions({
      queryKey: ["privacy-law", "study-materials", id] as const,
      queryFn: () => fetchStudyMaterialById({ id }),
      ...CACHE_PROFILE.SLOW,
    }),

  questionHistory: () =>
    queryOptions({
      queryKey: ["privacy-law", "questions"] as const,
      queryFn: fetchQuestionHistory,
    }),

  exams: () =>
    queryOptions({
      queryKey: ["privacy-law", "exams"] as const,
      queryFn: fetchExams,
      ...CACHE_PROFILE.MODERATE,
    }),

  exam: (id: string) =>
    queryOptions({
      queryKey: ["privacy-law", "exams", id] as const,
      queryFn: () => fetchExamById({ id }),
      ...CACHE_PROFILE.SLOW,
    }),
} as const;
