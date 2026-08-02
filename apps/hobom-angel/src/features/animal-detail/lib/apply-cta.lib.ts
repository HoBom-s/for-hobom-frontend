import type { AnimalStatusCode, PlacementType } from "@/entities/animal";

export interface ApplyCta {
  primaryLabel: string;
  /** Whether the primary action can be taken (design §02 status branch). */
  primaryEnabled: boolean;
  /** Which funnel the primary action opens (입양 vs 임보). */
  primaryKind: PlacementType;
  /** Show the secondary "임시보호 신청" action (only alongside a 입양 primary). */
  showFoster: boolean;
}

/**
 * Maps an animal's status and placement eligibility to its detail-page CTA.
 * Only AVAILABLE is actionable; then the eligible placements decide the buttons:
 * both → 입양(primary) + 임보(secondary), 입양-only → 입양, 임보-only → 임보 as the
 * primary. RESERVED/FOSTERED/ADOPTED/RETURNED are shown but disabled.
 */
export const applyCta = (
  status: AnimalStatusCode,
  eligiblePlacements: PlacementType[],
): ApplyCta => {
  if (status === "AVAILABLE") {
    const canAdopt = eligiblePlacements.includes("ADOPTION");
    const canFoster = eligiblePlacements.includes("FOSTER");

    if (canAdopt) {
      return {
        primaryLabel: "입양 신청하기",
        primaryEnabled: true,
        primaryKind: "ADOPTION",
        showFoster: canFoster,
      };
    }
    if (canFoster) {
      return {
        primaryLabel: "임시보호 신청하기",
        primaryEnabled: true,
        primaryKind: "FOSTER",
        showFoster: false,
      };
    }

    return { primaryLabel: "신청 마감", primaryEnabled: false, primaryKind: "ADOPTION", showFoster: false };
  }

  switch (status) {
    case "FOSTERED":
      return { primaryLabel: "임시보호 중", primaryEnabled: false, primaryKind: "ADOPTION", showFoster: false };
    case "ADOPTED":
      return { primaryLabel: "입양 완료", primaryEnabled: false, primaryKind: "ADOPTION", showFoster: false };
    case "RESERVED":
    case "RETURNED":
      return { primaryLabel: "신청 마감", primaryEnabled: false, primaryKind: "ADOPTION", showFoster: false };
  }
};
