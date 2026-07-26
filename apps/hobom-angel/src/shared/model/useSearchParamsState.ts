import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";

/**
 * A bidirectional codec between the URL query string and a typed value —
 * the nuqs-style boundary that keeps `URLSearchParams` (stringly-typed) from
 * leaking into components.
 */
export interface SearchParamsCodec<T> {
  decode: (params: URLSearchParams) => T;
  encode: (value: T) => URLSearchParams;
}

/**
 * Keeps a typed value in the URL query string. State is derived from — and
 * written back to — `?…`, so it is shareable, bookmarkable, and survives
 * reloads / back-forward. Writes `replace` history to avoid stacking an entry
 * per keystroke or toggle.
 *
 * The `codec` must be a stable reference (declare it at module scope), since it
 * anchors the memoised value and setter.
 */
export const useSearchParamsState = <T>(codec: SearchParamsCodec<T>) => {
  const [params, setParams] = useSearchParams();

  const value = useMemo(() => codec.decode(params), [params, codec]);

  const setValue = useCallback(
    (next: T) => setParams(codec.encode(next), { replace: true }),
    [setParams, codec],
  );

  const reset = useCallback(() => setParams(new URLSearchParams(), { replace: true }), [setParams]);

  return [value, setValue, reset] as const;
};
