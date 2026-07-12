// In dev, always route through the same-origin proxy (see vite.config's server
// proxy) regardless of the configured gateway, so the SameSite=Lax session
// cookies are same-site and actually sent. Prod uses the deployed gateway
// (where the FE and API are served same-site).
const GATEWAY_URL = import.meta.env.DEV
  ? "/api"
  : (import.meta.env.VITE_APP_HOBOM_API_GATEWAY_URL ?? "/api");

// The Angel backend sits behind the gateway under this fixed prefix. It is part
// of the API contract (same across environments), so it lives in code rather
// than the gateway env var.
const API_PREFIX = "/hobom-angel-backend/api/v1";

export const env = {
  VITE_APP_HOBOM_API_KEY: import.meta.env.VITE_APP_HOBOM_API_KEY ?? "",
  VITE_APP_HOBOM_API_GATEWAY_URL: GATEWAY_URL,
  // Full REST base for backend calls: gateway route + backend API prefix.
  API_BASE_URL: `${GATEWAY_URL}${API_PREFIX}`,
};
