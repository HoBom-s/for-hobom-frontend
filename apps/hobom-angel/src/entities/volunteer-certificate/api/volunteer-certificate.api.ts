import { httpClient, parseResponse } from "@/shared/api";
import { certificatesSchema, issuedCertificateSchema } from "./volunteer-certificate.schema";
import type { VolunteerCertificate } from "../model/volunteer-certificate.model";

const parseList = parseResponse(certificatesSchema, "GET /me/volunteer-certificates");
const parseIssued = parseResponse(issuedCertificateSchema, "POST /me/volunteer-certificates");

/** The signed-in volunteer's issued certificates (newest first). */
export const getMyCertificates = (signal?: AbortSignal): Promise<VolunteerCertificate[]> =>
  httpClient
    .get("/me/volunteer-certificates", { signal })
    .then(parseList)
    .then((raw): VolunteerCertificate[] => raw);

/** Issue a fresh certificate from the volunteer's completed participations. */
export const issueCertificate = (): Promise<VolunteerCertificate> =>
  httpClient
    .post("/me/volunteer-certificates", {})
    .then(parseIssued)
    .then((raw): VolunteerCertificate => raw);
