import { httpClient } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
import type {
  LawVersion,
  LawDiff,
  StudyMaterial,
  QuestionHistory,
  AskQuestionRequest,
  AskQuestionResponse,
  ExamSet,
  ExamSetDetail,
} from "./privacy-law.type";

const BASE = "/privacy-law";

// ── Versions ──

export const fetchVersions = async (signal?: AbortSignal) => {
  return await httpClient.get<HttpResponseType<LawVersion[]>>(`${BASE}/versions`, { signal });
};

export const fetchVersionById = async ({ id }: { id: string }, signal?: AbortSignal) => {
  return await httpClient.get<HttpResponseType<LawVersion>>(`${BASE}/versions/${id}`, { signal });
};

// ── Diffs ──

export const fetchDiffs = async (signal?: AbortSignal) => {
  return await httpClient.get<HttpResponseType<LawDiff[]>>(`${BASE}/diffs`, { signal });
};

export const fetchDiffById = async ({ id }: { id: string }, signal?: AbortSignal) => {
  return await httpClient.get<HttpResponseType<LawDiff>>(`${BASE}/diffs/${id}`, { signal });
};

// ── Study Materials ──

export const fetchStudyMaterials = async (signal?: AbortSignal) => {
  return await httpClient.get<HttpResponseType<StudyMaterial[]>>(`${BASE}/study-materials`, {
    signal,
  });
};

export const fetchStudyMaterialById = async ({ id }: { id: string }, signal?: AbortSignal) => {
  return await httpClient.get<HttpResponseType<StudyMaterial>>(`${BASE}/study-materials/${id}`, {
    signal,
  });
};

// ── Questions ──

export const fetchQuestionHistory = async (signal?: AbortSignal) => {
  return await httpClient.get<HttpResponseType<QuestionHistory[]>>(`${BASE}/questions`, { signal });
};

export const postAskQuestion = async (data: AskQuestionRequest) => {
  return await httpClient.post<HttpResponseType<AskQuestionResponse>>(`${BASE}/ask`, data);
};

// ── Exams ──

export const fetchExams = async (signal?: AbortSignal) => {
  return await httpClient.get<HttpResponseType<ExamSet[]>>(`${BASE}/exams`, { signal });
};

export const fetchExamById = async ({ id }: { id: string }, signal?: AbortSignal) => {
  return await httpClient.get<HttpResponseType<ExamSetDetail>>(`${BASE}/exams/${id}`, { signal });
};

export const postGenerateExam = async () => {
  return await httpClient.post<HttpResponseType<ExamSetDetail>>(
    `${BASE}/exams`,
    {},
    { timeout: 210_000 },
  );
};

// ── Admin ──

export const postFetchLaw = async () => {
  return await httpClient.post<void>(`${BASE}/fetch`, {});
};
