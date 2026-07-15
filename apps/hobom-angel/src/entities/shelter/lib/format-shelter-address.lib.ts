import type { ShelterAddress } from "../model/shelter.model";

/** Join whatever address parts the disclosure policy exposed into one line,
 *  e.g. "서울 강남구 테헤란로 123" (FULL) or "서울 강남구" (PARTIAL) or "서울" (HIDDEN). */
export const formatShelterAddress = (address: ShelterAddress): string =>
  [address.region, address.city, address.roadAddress].filter(Boolean).join(" ");
