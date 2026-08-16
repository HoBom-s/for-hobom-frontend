import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { RawVolunteerCertificate } from "./volunteer-certificate.type";

const certificateSchema = HoBomSchema.object({
  certificateNo: HoBomSchema.string(),
  volunteerNickname: HoBomSchema.string(),
  issuedAt: HoBomSchema.string(),
  totalCount: HoBomSchema.number(),
  totalMinutes: HoBomSchema.number(),
  totalHours: HoBomSchema.number(),
  items: HoBomSchema.array(
    HoBomSchema.object({
      eventTitle: HoBomSchema.string(),
      shelterName: HoBomSchema.string(),
      startAt: HoBomSchema.string(),
      endAt: HoBomSchema.string(),
      minutes: HoBomSchema.number(),
    }),
  ),
});

/** `GET /me/volunteer-certificates` — a bare array of certificates. */
export const certificatesSchema: Schema<RawVolunteerCertificate[]> =
  HoBomSchema.array(certificateSchema);

/** `POST /me/volunteer-certificates` — the newly issued certificate. */
export const issuedCertificateSchema: Schema<RawVolunteerCertificate> = certificateSchema;
