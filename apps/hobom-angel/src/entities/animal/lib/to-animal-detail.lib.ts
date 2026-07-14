import { toAnimal } from "./to-animal.lib";
import type { RawAnimalDetail } from "../api/animal.type";
import type { AnimalDetail } from "../model/animal.model";

/** Anti-corruption: flatten the API detail (nested traits/health/intake) into
 *  the UI detail model, reusing the shared list mapping for the common fields. */
export const toAnimalDetail = (raw: RawAnimalDetail): AnimalDetail => ({
  ...toAnimal(raw),
  photos: raw.photos.map((photo) => photo.objectKey),
  weightKg: raw.traits.weightKg,
  color: raw.traits.color,
  personality: raw.traits.personality,
  health: {
    neutered: raw.health.neutered,
    vaccinated: raw.health.vaccinated,
    microchipId: raw.health.microchipId,
    notes: raw.health.notes,
  },
  intake: {
    intakeDate: raw.intake.intakeDate,
    rescueStory: raw.intake.rescueStory,
    noticeNumber: raw.intake.noticeNumber,
  },
});
