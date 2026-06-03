import { useCallback, useEffect, useRef, useState } from "react";

/**
 * 텍스트를 클립보드에 복사하고, 일정 시간 동안 `copied`를 true로 유지한다.
 * 복사 성공 피드백("복사됨!") 표시에 사용.
 */
export function useCopyToClipboard(resetMs = 1500) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = useCallback(
    async (text: string) => {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), resetMs);
    },
    [resetMs],
  );

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return { copied, copy };
}
