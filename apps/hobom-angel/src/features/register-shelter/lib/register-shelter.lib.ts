import type { AddressVisibility } from "@/entities/shelter";

/** The registration form's editable state (before it becomes the API input). */
export interface RegisterShelterForm {
  name: string;
  slug: string;
  region: string;
  city: string;
  roadAddress: string;
  visibility: AddressVisibility;
  registrationNumber: string;
  businessNumber: string;
}

export const EMPTY_FORM: RegisterShelterForm = {
  name: "",
  slug: "",
  region: "",
  city: "",
  roadAddress: "",
  visibility: "PARTIAL",
  registrationNumber: "",
  businessNumber: "",
};

/** Backend contract: 3–40 chars, lowercase letters/digits, hyphen-separated. */
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SLUG_MIN = 3;
const SLUG_MAX = 40;

/** A stable public identifier check, mirrored server-side. */
export const isValidSlug = (slug: string): boolean =>
  slug.length >= SLUG_MIN && slug.length <= SLUG_MAX && SLUG_PATTERN.test(slug);

/** The 10-digit 사업자/고유번호, when provided (optional field). */
export const isValidBusinessNumber = (value: string): boolean => /^\d{10}$/.test(value);

/** Whether the form can be submitted — all required fields valid. */
export const canSubmit = (form: RegisterShelterForm): boolean =>
  form.name.trim().length > 0 &&
  isValidSlug(form.slug) &&
  form.region.trim().length > 0 &&
  form.roadAddress.trim().length > 0 &&
  (form.businessNumber === "" || isValidBusinessNumber(form.businessNumber));

/** Project the trimmed form into the `POST /shelters` request body. */
export const toRegisterInput = (form: RegisterShelterForm) => ({
  name: form.name.trim(),
  slug: form.slug.trim(),
  address: {
    region: form.region.trim(),
    city: form.city.trim(),
    roadAddress: form.roadAddress.trim(),
    visibility: form.visibility,
  },
  registrationNumber: form.registrationNumber.trim() || undefined,
  businessNumber: form.businessNumber.trim() || undefined,
});
