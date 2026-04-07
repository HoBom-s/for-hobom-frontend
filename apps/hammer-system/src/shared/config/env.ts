export const env = {
  VITE_APP_HAMMER_API_GATEWAY_URL:
    import.meta.env.VITE_APP_HAMMER_API_GATEWAY_URL ?? "/hammer-collectors",
  VITE_APP_HAMMER_USER_URL: import.meta.env.VITE_APP_HAMMER_USER_URL ?? "/hammer-users",
  VITE_APP_HAMMER_SUPPORT_URL: import.meta.env.VITE_APP_HAMMER_SUPPORT_URL ?? "/hammer-supports",
};
