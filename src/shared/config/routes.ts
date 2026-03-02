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
  PROJECTS: {
    LIST: "/projects",
    BOARD: "/projects/:projectId/board",
    BACKLOG: "/projects/:projectId/backlog",
    ISSUES: "/projects/:projectId/issues",
    ISSUE_DETAIL: "/projects/:projectId/issues/:issueKey",
    SETTINGS: "/projects/:projectId/settings",
  },
  DASHBOARD: {
    HOME: "/dashboard",
    SYSTEM: "/dashboard/system",
  },
  NOT_FOUND: {
    ALL: "*",
  },
} as const;
