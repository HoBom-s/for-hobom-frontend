export const env = {
  VITE_APP_HOBOM_API_KEY: import.meta.env.VITE_APP_HOBOM_API_KEY ?? "",
  VITE_APP_HOBOM_API_GATEWAY_URL: import.meta.env.VITE_APP_HOBOM_API_GATEWAY_URL ?? "/api",
  VITE_APP_HOBOM_SPACE_URL: import.meta.env.VITE_APP_HOBOM_SPACE_URL ?? "/space-api",
  VITE_APP_HOBOM_INTERNAL_URL: import.meta.env.VITE_APP_HOBOM_INTERNAL_URL ?? "/internal-api",
};
