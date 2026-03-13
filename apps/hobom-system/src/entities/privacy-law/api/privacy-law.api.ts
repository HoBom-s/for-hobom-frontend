import { httpClient } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
import type {
  LawVersion,
  LawDiff,
  StudyMaterial,
  QuestionHistory,
  AskQuestionRequest,
  AskQuestionResponse,
} from "./privacy-law.type";

const BASE = "/privacy-law";

// ── Versions ──

export const fetchVersions = async () => {
  return await httpClient.get<HttpResponseType<LawVersion[]>>(
    `${BASE}/versions`,
  );
};

export const fetchVersionById = async ({ id }: { id: string }) => {
  return await httpClient.get<HttpResponseType<LawVersion>>(
    `${BASE}/versions/${id}`,
  );
};

// ── Diffs ──

export const fetchDiffs = async () => {
  return await httpClient.get<HttpResponseType<LawDiff[]>>(`${BASE}/diffs`);
};

export const fetchDiffById = async ({ id }: { id: string }) => {
  return await httpClient.get<HttpResponseType<LawDiff>>(`${BASE}/diffs/${id}`);
};

// ── Study Materials ──

export const fetchStudyMaterials = async () => {
  return await httpClient.get<HttpResponseType<StudyMaterial[]>>(
    `${BASE}/study-materials`,
  );
};

export const fetchStudyMaterialById = async ({ id }: { id: string }) => {
  return await httpClient.get<HttpResponseType<StudyMaterial>>(
    `${BASE}/study-materials/${id}`,
  );
};

// ── Questions ──

export const fetchQuestionHistory = async () => {
  return await httpClient.get<HttpResponseType<QuestionHistory[]>>(
    `${BASE}/questions`,
  );
};

export const postAskQuestion = async (data: AskQuestionRequest) => {
  return await httpClient.post<HttpResponseType<AskQuestionResponse>>(
    `${BASE}/ask`,
    data,
  );
};

// ── Admin ──

export const postFetchLaw = async () => {
  return await httpClient.post<void>(`${BASE}/fetch`, {});
};
