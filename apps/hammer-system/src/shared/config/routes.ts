export const RoutesConfig = {
  AUTH: {
    LOGIN: "/auth/login",
  },
  DASHBOARD: {
    OVERVIEW: "/",
    LOG_EXPLORER: "/logs",
  },
  NOTIFICATION_TEMPLATE: {
    LIST: "/notification-templates",
  },
  LEGAL_DOCUMENT: {
    LIST: "/legal-documents",
  },
  NOT_FOUND: {
    ALL: "*",
  },
} as const;
