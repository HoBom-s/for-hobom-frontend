import { reportError } from "@/shared/lib/report-error.lib";
import type { Schema } from "hobom-schema";

/**
 * 응답 페이로드를 스키마로 검증하는 경계 파서.
 *
 * 불일치해도 throw하지 않는다 — `reportError`로 계약 위반을 보고하고 원본 데이터를
 * 그대로 통과시켜, 백엔드 드리프트가 화면을 깨뜨리지 않게 한다. 로깅된 불일치를
 * 근거로 스키마/타입을 점진적으로 실제 계약에 맞춰간다 (advisory validation).
 *
 * @param schema  기대하는 페이로드 스키마
 * @param context 보고 메시지에 붙일 식별자 (예: `"GET /labels"`)
 */
export const parseResponse =
  <T>(schema: Schema<T>, context: string) =>
  (data: unknown): T => {
    const result = schema.safeParse(data);

    if (result.success) {
      return result.data;
    }

    const detail = result.error.issues.map((issue) => issue.message).join("; ");

    reportError(new Error(`Response validation mismatch (${context}): ${detail}`));

    // Advisory only: pass the unvalidated payload through so a schema/wire
    // mismatch is reported, not fatal.
    return data as T;
  };
