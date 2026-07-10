import { httpClient, parseResponse } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
import {
  lawVersionSchema,
  lawVersionsSchema,
  lawDiffSchema,
  lawDiffsSchema,
  studyMaterialSchema,
  studyMaterialsSchema,
  questionHistoriesSchema,
  examSetsSchema,
  examSetDetailSchema,
} from "./privacy-law.schema";
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
  const res = await httpClient.get<HttpResponseType<LawVersion[]>>(`${BASE}/versions`, { signal });

  return { ...res, items: parseResponse(lawVersionsSchema, "GET /privacy-law/versions")(res.items) };
};

export const fetchVersionById = async ({ id }: { id: string }, signal?: AbortSignal) => {
  const res = await httpClient.get<HttpResponseType<LawVersion>>(`${BASE}/versions/${id}`, {
    signal,
  });

  return {
    ...res,
    items: parseResponse(lawVersionSchema, "GET /privacy-law/versions/:id")(res.items),
  };
};

// ── Diffs ──

export const fetchDiffs = async (signal?: AbortSignal) => {
  const res = await httpClient.get<HttpResponseType<LawDiff[]>>(`${BASE}/diffs`, { signal });

  return { ...res, items: parseResponse(lawDiffsSchema, "GET /privacy-law/diffs")(res.items) };
};

export const fetchDiffById = async ({ id }: { id: string }, signal?: AbortSignal) => {
  const res = await httpClient.get<HttpResponseType<LawDiff>>(`${BASE}/diffs/${id}`, { signal });

  return { ...res, items: parseResponse(lawDiffSchema, "GET /privacy-law/diffs/:id")(res.items) };
};

// ── Study Materials ──

export const fetchStudyMaterials = async (signal?: AbortSignal) => {
  const res = await httpClient.get<HttpResponseType<StudyMaterial[]>>(`${BASE}/study-materials`, {
    signal,
  });

  return {
    ...res,
    items: parseResponse(studyMaterialsSchema, "GET /privacy-law/study-materials")(res.items),
  };
};

export const fetchStudyMaterialById = async ({ id }: { id: string }, signal?: AbortSignal) => {
  const res = await httpClient.get<HttpResponseType<StudyMaterial>>(
    `${BASE}/study-materials/${id}`,
    {
      signal,
    },
  );

  return {
    ...res,
    items: parseResponse(studyMaterialSchema, "GET /privacy-law/study-materials/:id")(res.items),
  };
};

// ── Questions ──

export const fetchQuestionHistory = async (signal?: AbortSignal) => {
  const res = await httpClient.get<HttpResponseType<QuestionHistory[]>>(`${BASE}/questions`, {
    signal,
  });

  return {
    ...res,
    items: parseResponse(questionHistoriesSchema, "GET /privacy-law/questions")(res.items),
  };
};

export const postAskQuestion = async (data: AskQuestionRequest) => {
  return await httpClient.post<HttpResponseType<AskQuestionResponse>>(`${BASE}/ask`, data);
};

// ── Exams ──

export const fetchExams = async (signal?: AbortSignal) => {
  const res = await httpClient.get<HttpResponseType<ExamSet[]>>(`${BASE}/exams`, { signal });

  return { ...res, items: parseResponse(examSetsSchema, "GET /privacy-law/exams")(res.items) };
};

export const fetchExamById = async ({ id }: { id: string }, signal?: AbortSignal) => {
  const res = await httpClient.get<HttpResponseType<ExamSetDetail>>(`${BASE}/exams/${id}`, {
    signal,
  });

  return {
    ...res,
    items: parseResponse(examSetDetailSchema, "GET /privacy-law/exams/:id")(res.items),
  };
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
