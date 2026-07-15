import type {
  RawShelter,
  RawShelterAnnouncement,
  RawShelterFaq,
} from "../api/shelter.type";
import type { Shelter, ShelterAnnouncement, ShelterFaq } from "../model/shelter.model";

/** Anti-corruption: flatten the API shelter (optional address parts, objectKey
 *  photos) into the UI model, normalizing absent fields to null. */
export const toShelter = (raw: RawShelter): Shelter => ({
  id: raw.id,
  slug: raw.slug,
  name: raw.name,
  status: raw.status,
  trustTier: raw.trustTier,
  addressVisibility: raw.addressVisibility,
  address: {
    region: raw.address.region,
    city: raw.address.city ?? null,
    roadAddress: raw.address.roadAddress ?? null,
    lat: raw.address.lat ?? null,
    lng: raw.address.lng ?? null,
  },
  facilityPhotos: raw.facilityPhotos.map((photo) => ({
    url: photo.objectKey,
    kind: photo.kind,
    caption: photo.caption ?? null,
  })),
  intro: raw.intro,
  operatingSince: raw.operatingSince,
  representativeName: raw.representativeName,
  visitGuide: raw.visitGuide,
  supportGuide: raw.supportGuide,
  coverImageUrl: raw.coverImageKey,
});

export const toShelterAnnouncement = (raw: RawShelterAnnouncement): ShelterAnnouncement => ({
  id: raw.id,
  title: raw.title,
  body: raw.body,
  pinned: raw.pinned,
  createdAt: raw.createdAt,
});

export const toShelterFaq = (raw: RawShelterFaq): ShelterFaq => ({
  id: raw.id,
  question: raw.question,
  answer: raw.answer,
});
