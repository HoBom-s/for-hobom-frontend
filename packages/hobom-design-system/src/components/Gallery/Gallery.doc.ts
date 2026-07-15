import type { ComponentDoc } from "../../foundations/docs";

export const docs: ComponentDoc = {
  name: "Gallery",
  description:
    "A photo gallery: one large main image plus a thumbnail strip to switch it. Generalizes the animal-detail gallery so screens (animal detail, shelter facility photos) share the same behavior.",
  features: [
    "Stateful — tracks the selected image internally; click a thumbnail to swap the main image",
    "Resets to the first image when the `images` list changes; clamps the index if it falls out of range",
    "Thumbnail strip only renders when there is more than one image",
    "Composes Hb.Image, inheriting its aspect-ratio frame, shimmer placeholder, and fallback",
  ],
  props: [
    {
      name: "images",
      type: "{ src: string; alt?: string }[]",
      description: "Images to show. The first is selected initially.",
      required: true,
    },
    {
      name: "alt",
      type: "string",
      description: 'Base label used when an image has no `alt` (e.g. "콩이 사진 2").',
    },
    {
      name: "ratio",
      type: "string",
      description: "CSS aspect-ratio for the main image frame.",
      default: '"4 / 3"',
    },
  ],
  examples: [
    {
      label: "Multi-image gallery with thumbnails",
      code: `<Hb.Gallery
  images={[
    { src: kong1, alt: "콩이 정면" },
    { src: kong2 },
    { src: kong3 },
  ]}
  alt="콩이"
  ratio="4 / 3"
/>`,
    },
    {
      label: "Single image (no thumbnail strip)",
      code: `<Hb.Gallery images={[{ src: facility }]} alt="보호소" ratio="4 / 3" />`,
    },
  ],
  accessibility: [
    "Each thumbnail is a <button> with an aria-label like `2번째 사진 보기` and aria-current on the selected one.",
    "Provide `alt` (or per-image `alt`) so the main and thumbnail images have meaningful labels.",
  ],
  notes: [
    "Composes Hb.Image — no lightbox, zoom, or autoplay; keep it a focused switcher.",
    "State is internal; the selected image resets whenever a new `images` array is passed.",
  ],
};
