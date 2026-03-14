import { useRef, useSyncExternalStore } from "react";
import { MutationObserver } from "./mutation-observer";
import type { UseMutationOptions, UseMutationResult } from "./types";

export function useMutation<TData = unknown, TError = Error, TVariables = void, TContext = unknown>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
): UseMutationResult<TData, TError, TVariables> {
  const observerRef = useRef<MutationObserver<TData, TError, TVariables, TContext> | null>(null);

  if (!observerRef.current) {
    observerRef.current = new MutationObserver(options);
  }

  const observer = observerRef.current;

  return useSyncExternalStore(
    (onStoreChange) => observer.subscribe(onStoreChange),
    () => observer.getResult(),
    () => observer.getResult(),
  );
}
