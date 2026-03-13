export const RoutesConfig = {
  MAIN: {
    DAILY_TODO: "/daily-todo",
  },
  AUTH: {
    LOGIN: "/auth/login",
    SIGN_UP: "/auth/signup",
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
    DASHBOARD: "/projects/:projectId/dashboard",
    SETTINGS: "/projects/:projectId/settings",
  },
  WIKI: {
    SPACES: "/wiki",
    SPACE_HOME: "/wiki/:spaceKey",
    PAGE: "/wiki/:spaceKey/pages/:pageId",
  },
  PRIVACY_LAW: {
    HOME: "/privacy-law",
    VERSIONS: "/privacy-law/versions",
    VERSION_DETAIL: "/privacy-law/versions/:versionId",
    DIFFS: "/privacy-law/diffs",
    DIFF_DETAIL: "/privacy-law/diffs/:diffId",
    STUDY: "/privacy-law/study",
    STUDY_DETAIL: "/privacy-law/study/:materialId",
    CHAT: "/privacy-law/chat",
    EXAMS: "/privacy-law/exams",
    EXAM_DETAIL: "/privacy-law/exams/:examId",
  },
  ADMIN: {
    USERS: "/admin/users",
  },
  DASHBOARD: {
    HOME: "/",
    SYSTEM: "/dashboard/system",
    LOGS: "/dashboard/logs",
    ERRORS: "/dashboard/errors",
  },
  NOT_FOUND: {
    ALL: "*",
  },
} as const;
