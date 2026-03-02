interface RuntimeEnv {
  VITE_APP_HOBOM_API_GATEWAY_URL: string;
  VITE_APP_HOBOM_API_KEY: string;
}

declare global {
  interface Window {
    __ENV__?: Partial<RuntimeEnv>;
  }
}

export const env: RuntimeEnv = {
  VITE_APP_HOBOM_API_GATEWAY_URL:
    window.__ENV__?.VITE_APP_HOBOM_API_GATEWAY_URL ??
    import.meta.env.VITE_APP_HOBOM_API_GATEWAY_URL ??
    "",
  VITE_APP_HOBOM_API_KEY:
    window.__ENV__?.VITE_APP_HOBOM_API_KEY ??
    import.meta.env.VITE_APP_HOBOM_API_KEY ??
    "",
};
