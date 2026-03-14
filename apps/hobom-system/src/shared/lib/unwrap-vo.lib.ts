/** Value Object에서 원시 문자열을 추출 */
export const unwrapVO = (v: { value: string } | string | null | undefined): string => {
  if (v == null) return "";

  return typeof v === "string" ? v : v.value;
};
