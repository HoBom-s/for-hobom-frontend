export type ShelterTab = "about" | "animals" | "notices" | "volunteer" | "faq";

export const SHELTER_TABS: { value: ShelterTab; label: string }[] = [
  { value: "about", label: "소개" },
  { value: "animals", label: "동물" },
  { value: "notices", label: "공지·소식" },
  { value: "volunteer", label: "봉사" },
  { value: "faq", label: "FAQ" },
];

export const isShelterTab = (value: string | null): value is ShelterTab =>
  value === "about" ||
  value === "animals" ||
  value === "notices" ||
  value === "volunteer" ||
  value === "faq";
