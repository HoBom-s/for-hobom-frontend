export const applyParams = (
  base: URLSearchParams,
  updates: Record<string, string | undefined>,
): URLSearchParams => {
  const next = new URLSearchParams(base);
  Object.entries(updates).forEach(([key, value]) =>
    value === undefined ? next.delete(key) : next.set(key, value),
  );
  return next;
};

export const buildPath = (
  pathname: string,
  params: URLSearchParams,
): string => {
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
};
