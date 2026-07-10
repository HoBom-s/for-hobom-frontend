import type { Schema } from "hobom-schema";

/**
 * 응답 페이로드를 스키마로 검증하는 경계 파서.
 *
 * 불일치 시 즉시 throw한다 — 서버 계약 위반이 렌더링 깊숙한 곳에서 터지는 대신
 * 이 경계에서 (쿼리 에러로) 드러나게 한다.
 *
 * @param schema  기대하는 페이로드 스키마
 * @param context 실패 메시지에 붙일 식별자 (예: `"GET /labels"`)
 */
export const parseResponse =
  <T>(schema: Schema<T>, context: string) =>
  (data: unknown): T => {
    const result = schema.safeParse(data);

    if (result.success) {
      return result.data;
    }

    const detail = result.error.issues.map((issue) => issue.message).join("; ");

    throw new Error(`Response validation failed (${context}): ${detail}`);
  };
