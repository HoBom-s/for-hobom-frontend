import { userHttpClient } from "@/shared/api";
import type { LegalDocumentResponse, CreateLegalDocumentRequest } from "./legal-document.type";

export const fetchTerms = () =>
  userHttpClient.get<LegalDocumentResponse>("/legal/terms");

export const fetchPrivacy = () =>
  userHttpClient.get<LegalDocumentResponse>("/legal/privacy");

export const postCreateLegalDocument = (data: CreateLegalDocumentRequest) =>
  userHttpClient.post<LegalDocumentResponse>("/internal/legal", data);
