/**
 * 점(.)으로 구분된 접근 경로를 root 객체에서 따라가 값을 얻는다.
 * 매니페스트의 `import.access`(예: "Hb.Button", "Hb.Card.Root")를
 * 실제 컴포넌트 참조로 해석하는 데 쓴다. 경로가 끊기면 undefined.
 */
export const resolvePath = (root: unknown, dottedPath: string): unknown =>
  dottedPath.split(".").reduce<unknown>((acc, segment) => {
    if (acc && typeof acc === "object" && segment in acc) {
      return (acc as Record<string, unknown>)[segment];
    }

    return undefined;
  }, root);
