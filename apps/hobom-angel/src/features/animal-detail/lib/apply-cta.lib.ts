import type { AnimalStatusCode } from "@/entities/animal";

export interface ApplyCta {
  primaryLabel: string;
  /** Whether the primary action can be taken (design §02 status branch). */
  primaryEnabled: boolean;
  /** Show the secondary "임시보호 신청" action. */
  showFoster: boolean;
}

/**
 * Maps an animal's status to its detail-page CTA:
 * AVAILABLE → 입양/임보 신청, RESERVED → 신청 마감, FOSTERED → 임시보호 중,
 * ADOPTED → 입양 완료. Only AVAILABLE is actionable.
 */
export const applyCta = (status: AnimalStatusCode): ApplyCta => {
  switch (status) {
    case "AVAILABLE":
      return { primaryLabel: "입양 신청하기", primaryEnabled: true, showFoster: true };
    case "FOSTERED":
      return { primaryLabel: "임시보호 중", primaryEnabled: false, showFoster: false };
    case "ADOPTED":
      return { primaryLabel: "입양 완료", primaryEnabled: false, showFoster: false };
    case "RESERVED":
    case "RETURNED":
      return { primaryLabel: "신청 마감", primaryEnabled: false, showFoster: false };
  }
};
