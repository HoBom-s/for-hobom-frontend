import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type {
  LawParagraph,
  LawArticle,
  LawVersion,
  ArticleChange,
  LawDiff,
  Quiz,
  StudyMaterial,
  QuestionHistory,
  ExamQuestion,
  ExamSet,
  ExamSetDetail,
} from "./privacy-law.type";

// ── Versions ──

const paragraphSubItemSchema = HoBomSchema.object({
  no: HoBomSchema.string(),
  content: HoBomSchema.string(),
});

const lawParagraphSchema: Schema<LawParagraph> = HoBomSchema.object({
  no: HoBomSchema.string(),
  content: HoBomSchema.string(),
  subItems: HoBomSchema.array(paragraphSubItemSchema),
});

const lawArticleSchema: Schema<LawArticle> = HoBomSchema.object({
  articleNo: HoBomSchema.string(),
  title: HoBomSchema.string(),
  content: HoBomSchema.string(),
  paragraphs: HoBomSchema.array(lawParagraphSchema),
});

export const lawVersionSchema: Schema<LawVersion> = HoBomSchema.object({
  id: HoBomSchema.string(),
  lawId: HoBomSchema.string(),
  lawName: HoBomSchema.string(),
  proclamationDate: HoBomSchema.date(),
  enforcementDate: HoBomSchema.date(),
  articles: HoBomSchema.array(lawArticleSchema),
  rawXml: HoBomSchema.string().optional(),
  fetchedAt: HoBomSchema.date(),
});

export const lawVersionsSchema: Schema<LawVersion[]> = HoBomSchema.array(lawVersionSchema);

// ── Diffs ──

const articleChangeSchema: Schema<ArticleChange> = HoBomSchema.object({
  articleNo: HoBomSchema.string(),
  changeType: HoBomSchema.enum(["ADDED", "MODIFIED", "DELETED"]),
  before: HoBomSchema.string().optional(),
  after: HoBomSchema.string().optional(),
});

export const lawDiffSchema: Schema<LawDiff> = HoBomSchema.object({
  id: HoBomSchema.string(),
  fromVersionId: HoBomSchema.string(),
  toVersionId: HoBomSchema.string(),
  fromProclamationDate: HoBomSchema.date(),
  toProclamationDate: HoBomSchema.date(),
  changes: HoBomSchema.array(articleChangeSchema),
});

export const lawDiffsSchema: Schema<LawDiff[]> = HoBomSchema.array(lawDiffSchema);

// ── Study Materials ──

const quizSchema: Schema<Quiz> = HoBomSchema.object({
  type: HoBomSchema.string(),
  question: HoBomSchema.string(),
  choices: HoBomSchema.array(HoBomSchema.string()),
  answer: HoBomSchema.string(),
  explanation: HoBomSchema.string(),
});

export const studyMaterialSchema: Schema<StudyMaterial> = HoBomSchema.object({
  id: HoBomSchema.string(),
  diffId: HoBomSchema.string(),
  summary: HoBomSchema.string(),
  keyPoints: HoBomSchema.array(HoBomSchema.string()),
  quizzes: HoBomSchema.array(quizSchema),
});

export const studyMaterialsSchema: Schema<StudyMaterial[]> =
  HoBomSchema.array(studyMaterialSchema);

// ── Questions ──

export const questionHistorySchema: Schema<QuestionHistory> = HoBomSchema.object({
  id: HoBomSchema.string(),
  question: HoBomSchema.string(),
  answer: HoBomSchema.string(),
  referencedArticles: HoBomSchema.array(HoBomSchema.string()),
  createdAt: HoBomSchema.date(),
});

export const questionHistoriesSchema: Schema<QuestionHistory[]> =
  HoBomSchema.array(questionHistorySchema);

// ── Exams ──

const examQuestionSchema: Schema<ExamQuestion> = HoBomSchema.object({
  no: HoBomSchema.number(),
  subject: HoBomSchema.string(),
  type: HoBomSchema.string(),
  question: HoBomSchema.string(),
  choices: HoBomSchema.array(HoBomSchema.string()),
  answer: HoBomSchema.string(),
  explanation: HoBomSchema.string(),
});

export const examSetSchema: Schema<ExamSet> = HoBomSchema.object({
  id: HoBomSchema.string(),
  title: HoBomSchema.string(),
  version: HoBomSchema.number(),
  totalQuestions: HoBomSchema.number(),
  createdAt: HoBomSchema.date(),
});

export const examSetsSchema: Schema<ExamSet[]> = HoBomSchema.array(examSetSchema);

export const examSetDetailSchema: Schema<ExamSetDetail> = HoBomSchema.object({
  id: HoBomSchema.string(),
  title: HoBomSchema.string(),
  version: HoBomSchema.number(),
  totalQuestions: HoBomSchema.number(),
  createdAt: HoBomSchema.date(),
  questions: HoBomSchema.array(examQuestionSchema),
});
