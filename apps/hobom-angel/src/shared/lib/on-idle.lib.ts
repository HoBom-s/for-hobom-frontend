type IdleCancel = () => void;

/**
 * Run low-priority work when the browser is idle, falling back to a timeout on
 * browsers without `requestIdleCallback` (e.g. Safari before 18.4). A bare
 * `requestIdleCallback(...)` reference throws there, which would crash the app
 * on load — so this feature-detects it off `window` first.
 */
export const onIdle = (task: () => void): IdleCancel => {
  if (typeof window !== "undefined" && typeof window.requestIdleCallback === "function") {
    const handle = window.requestIdleCallback(task);

    return () => window.cancelIdleCallback(handle);
  }

  const handle = setTimeout(task, 200);

  return () => clearTimeout(handle);
};
