import type { RawShelterMarker } from "../api/shelter.type";
import type { ShelterMarker } from "../model/shelter.model";

/** Anti-corruption: map the API marker into the UI model (absent coords → null). */
export const toShelterMarker = (raw: RawShelterMarker): ShelterMarker => ({
  id: raw.id,
  name: raw.name,
  slug: raw.slug,
  region: raw.region,
  lat: raw.lat ?? null,
  lng: raw.lng ?? null,
});
