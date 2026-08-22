import type { RawAnimal } from "../api/animal.type";
import type { Animal } from "../model/animal.model";

/** Anti-corruption: flatten the API animal (nested traits) into the UI model. */
export const toAnimal = (raw: RawAnimal): Animal => ({
  id: raw.id,
  shelterId: raw.shelterId,
  name: raw.name,
  species: raw.species,
  status: raw.status,
  eligiblePlacements: raw.eligiblePlacements,
  sex: raw.traits.sex,
  size: raw.traits.size,
  ageMonths: raw.traits.ageMonths,
  breed: raw.traits.breed,
  personality: raw.traits.personality,
  description: raw.description,
  health: raw.health,
  intake: raw.intake,
  photoUrl: raw.photos[0]?.objectKey,
});
