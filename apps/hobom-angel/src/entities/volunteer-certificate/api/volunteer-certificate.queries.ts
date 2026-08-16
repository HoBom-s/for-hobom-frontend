import { queryOptions } from "hobom-data";
import { getMyCertificates } from "./volunteer-certificate.api";

export const volunteerCertificateQueries = {
  all: () => ["volunteer-certificates"] as const,

  mine: () =>
    queryOptions({
      queryKey: [...volunteerCertificateQueries.all(), "mine"] as const,
      queryFn: ({ signal }) => getMyCertificates(signal),
    }),
} as const;
