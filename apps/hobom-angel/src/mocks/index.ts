/**
 * Starts the MSW mock worker when `VITE_ENABLE_MSW` is on (local dev + e2e), so
 * the app talks to in-browser mocks instead of a live backend. A no-op — and the
 * worker code is never bundled — otherwise.
 */
export const startMocks = async (): Promise<void> => {
  if (import.meta.env.VITE_ENABLE_MSW !== "true") return;

  const { worker } = await import("./browser");

  await worker.start({
    // The worker is served from Vite's base (/hobom-angel/), not the origin root.
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
    onUnhandledRequest: "bypass",
  });
};
