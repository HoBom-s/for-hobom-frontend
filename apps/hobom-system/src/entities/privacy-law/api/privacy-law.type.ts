interface ParagraphSubItem {
  no: string;
  content: string;
}

export interface LawParagraph {
  no: string;
  content: string;
  subItems: ParagraphSubItem[];
}

export interface LawArticle {
  articleNo: string;
  title: string;
  content: string;
  paragraphs: LawParagraph[];
}

export interface LawVersion {
  id: string;
  lawId: string;
  lawName: string;
  proclamationDate: string;
  enforcementDate: string;
  articles: LawArticle[];
  rawXml?: string;
  fetchedAt: string;
}

export interface ArticleChange {
  articleNo: string;
  changeType: "ADDED" | "MODIFIED" | "DELETED";
  before?: string;
  after?: string;
}

export interface LawDiff {
  id: string;
  fromVersionId: string;
  toVersionId: string;
  fromProclamationDate: string;
  toProclamationDate: string;
  changes: ArticleChange[];
}

export interface Quiz {
  type: string;
  question: string;
  choices: string[];
  answer: string;
  explanation: string;
}

export interface StudyMaterial {
  id: string;
  diffId: string;
  summary: string;
  keyPoints: string[];
  quizzes: Quiz[];
}

export interface QuestionHistory {
  id: string;
  question: string;
  answer: string;
  referencedArticles: string[];
  createdAt: string;
}

export interface AskQuestionRequest {
  question: string;
}

export interface AskQuestionResponse {
  answer: string;
  referencedArticles: string[];
}

export interface ExamQuestion {
  no: number;
  subject: string;
  type: string;
  question: string;
  choices: string[];
  answer: string;
  explanation: string;
}

export interface ExamSet {
  id: string;
  title: string;
  version: number;
  totalQuestions: number;
  createdAt: string;
}

export interface ExamSetDetail extends ExamSet {
  questions: ExamQuestion[];
}
