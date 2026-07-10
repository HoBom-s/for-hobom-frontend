import { queryOptions } from "hobom-data";
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
      queryFn: ({ signal }) => fetchVersions(signal),
      ...CACHE_PROFILE.SLOW,
    }),

  version: (id: string) =>
    queryOptions({
      queryKey: ["privacy-law", "versions", id] as const,
      queryFn: ({ signal }) => fetchVersionById({ id }, signal),
      ...CACHE_PROFILE.SLOW,
    }),

  diffs: () =>
    queryOptions({
      queryKey: ["privacy-law", "diffs"] as const,
      queryFn: ({ signal }) => fetchDiffs(signal),
      ...CACHE_PROFILE.SLOW,
    }),

  diff: (id: string) =>
    queryOptions({
      queryKey: ["privacy-law", "diffs", id] as const,
      queryFn: ({ signal }) => fetchDiffById({ id }, signal),
      ...CACHE_PROFILE.SLOW,
    }),

  studyMaterials: () =>
    queryOptions({
      queryKey: ["privacy-law", "study-materials"] as const,
      queryFn: ({ signal }) => fetchStudyMaterials(signal),
      ...CACHE_PROFILE.SLOW,
    }),

  studyMaterial: (id: string) =>
    queryOptions({
      queryKey: ["privacy-law", "study-materials", id] as const,
      queryFn: ({ signal }) => fetchStudyMaterialById({ id }, signal),
      ...CACHE_PROFILE.SLOW,
    }),

  questionHistory: () =>
    queryOptions({
      queryKey: ["privacy-law", "questions"] as const,
      queryFn: ({ signal }) => fetchQuestionHistory(signal),
    }),

  exams: () =>
    queryOptions({
      queryKey: ["privacy-law", "exams"] as const,
      queryFn: ({ signal }) => fetchExams(signal),
      ...CACHE_PROFILE.MODERATE,
    }),

  exam: (id: string) =>
    queryOptions({
      queryKey: ["privacy-law", "exams", id] as const,
      queryFn: ({ signal }) => fetchExamById({ id }, signal),
      ...CACHE_PROFILE.SLOW,
    }),
} as const;
