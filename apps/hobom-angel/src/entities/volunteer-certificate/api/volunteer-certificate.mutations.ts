import { mutationOptions } from "hobom-data";
import { issueCertificate } from "./volunteer-certificate.api";

export const volunteerCertificateMutations = {
  issue: () =>
    mutationOptions({
      mutationFn: () => issueCertificate(),
    }),
} as const;
