/** Single source of truth for the app's route paths. */
export const ROUTES = {
  HOME: "/",

  // Consumer sections (behind auth — the landing is the only public surface).
  ANIMALS: "/animals",
  ANIMAL_DETAIL: "/animals/:animalId",
  APPLY: "/apply/:animalId",
  FOSTER: "/foster",
  FOSTER_APPLY: "/foster/apply/:animalId",
  VOLUNTEER: "/volunteer",
  VOLUNTEER_WRITE: "/volunteer/posts/new",
  SHELTERS: "/shelters",
  SHELTER_DETAIL: "/shelters/:shelterSlug",
  FAVORITES: "/favorites",
  APPLICATIONS: "/applications",
  MY: "/my",

  // Shelter staff console.
  CONSOLE: "/console",
  CONSOLE_ANIMALS: "/console/animals",
  CONSOLE_VOLUNTEER: "/console/volunteer",
  CONSOLE_CONTENT: "/console/content",

  // Auth.
  LOGIN: "/login",
  SIGNUP: "/signup",
  PASSWORD_RESET: "/reset",

  // Public info (footer).
  TERMS: "/terms",
  PRIVACY: "/privacy",
  BUSINESS_INFO: "/business",
  ANIMAL_LAW: "/animal-law-notice",
} as const;

/** Build the concrete path to an animal's detail page. */
export const animalDetailPath = (animalId: string): string => `/animals/${animalId}`;

/** Build the concrete path to an animal's adoption application funnel. */
export const applyPath = (animalId: string): string => `/apply/${animalId}`;
export const fosterApplyPath = (animalId: string): string => `/foster/apply/${animalId}`;

/** Build the concrete path to a shelter's microsite (by slug). */
export const shelterPath = (shelterSlug: string): string => `/shelters/${shelterSlug}`;
