import type { RawShelterListItem } from "../api/shelter.type";
import type { ShelterListItem } from "../model/shelter.model";

/** Anti-corruption: map the API list item (objectKey cover) into the UI model. */
export const toShelterListItem = (raw: RawShelterListItem): ShelterListItem => ({
  id: raw.id,
  name: raw.name,
  slug: raw.slug,
  region: raw.region,
  status: raw.status,
  trustTier: raw.trustTier,
  coverImageUrl: raw.coverImageKey,
});
