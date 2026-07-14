/** Single source of truth for the app's route paths. */
export const ROUTES = {
  HOME: "/",

  // Consumer sections (behind auth — the landing is the only public surface).
  ANIMALS: "/animals",
  ANIMAL_DETAIL: "/animals/:animalId",
  APPLY: "/apply/:animalId",
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

/** Build the concrete path to an animal's detail page. */
export const animalDetailPath = (animalId: string): string => `/animals/${animalId}`;

/** Build the concrete path to an animal's adoption application funnel. */
export const applyPath = (animalId: string): string => `/apply/${animalId}`;
