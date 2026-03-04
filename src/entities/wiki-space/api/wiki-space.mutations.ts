import { mutationOptions } from "@tanstack/react-query";
import { postCreateSpace, putUpdateSpace, deleteSpace } from "./wiki-space.api";

export const wikiSpaceMutations = {
  spaces: () => ["wiki-spaces"] as const,

  create: () =>
    mutationOptions({
      mutationKey: [...wikiSpaceMutations.spaces(), "create"] as const,
      mutationFn: postCreateSpace,
    }),

  update: () =>
    mutationOptions({
      mutationKey: [...wikiSpaceMutations.spaces(), "update"] as const,
      mutationFn: putUpdateSpace,
    }),

  delete: () =>
    mutationOptions({
      mutationKey: [...wikiSpaceMutations.spaces(), "delete"] as const,
      mutationFn: deleteSpace,
    }),
} as const;
