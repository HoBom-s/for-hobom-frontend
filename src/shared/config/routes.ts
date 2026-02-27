export const RoutesConfig = {
  MAIN: {
    DAILY_TODO: "/",
  },
  AUTH: {
    LOGIN: "/auth/login",
  },
  MENU: {
    RECOMMENDATION: "/menu/recommendation",
    PICK: "/menu/pick",
  },
  MESSAGE: {
    RESERVATION: "/message/reservation",
    SEND_FUNNEL: "/message/send",
  },
  NOTES: {
    LIST: "/notes",
  },
  NOTIFICATION: {
    LIST: "/notifications",
  },
  DASHBOARD: {
    HOME: "/dashboard",
    SYSTEM: "/dashboard/system",
  },
  NOT_FOUND: {
    ALL: "*",
  },
} as const;
