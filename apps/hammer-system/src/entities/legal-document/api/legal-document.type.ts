/**
 * 1 = TermsOfService (이용약관)
 * 2 = PrivacyPolicy (개인정보처리방침)
 */
export type LegalDocumentKind = 1 | 2;

export interface LegalDocumentResponse {
  version: string;
  effectiveDate: string;
  content: string;
}

export interface CreateLegalDocumentRequest {
  type: LegalDocumentKind;
  version: string;
  effectiveDate: string;
  content: string;
}
