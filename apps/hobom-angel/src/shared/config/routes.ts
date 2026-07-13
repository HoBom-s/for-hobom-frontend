/** Single source of truth for the app's route paths. */
export const ROUTES = {
  HOME: "/",

  // Consumer sections (behind auth — the landing is the only public surface).
  ANIMALS: "/animals",
  FOSTER: "/foster",
  VOLUNTEER: "/volunteer",
  SHELTERS: "/shelters",
  FAVORITES: "/favorites",
  APPLICATIONS: "/applications",
  MY: "/my",

  // Auth.
  LOGIN: "/login",
  SIGNUP: "/signup",
  PASSWORD_RESET: "/reset",
} as const;
