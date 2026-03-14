import { mutationOptions } from "@tanstack/react-query";
import { postCreatePage, putUpdatePage, deletePage, postRestorePageVersion } from "./wiki-page.api";

export const wikiPageMutations = {
  pages: () => ["wiki-pages"] as const,

  create: () =>
    mutationOptions({
      mutationKey: [...wikiPageMutations.pages(), "create"] as const,
      mutationFn: postCreatePage,
    }),

  update: () =>
    mutationOptions({
      mutationKey: [...wikiPageMutations.pages(), "update"] as const,
      mutationFn: putUpdatePage,
    }),

  delete: () =>
    mutationOptions({
      mutationKey: [...wikiPageMutations.pages(), "delete"] as const,
      mutationFn: deletePage,
    }),

  restoreVersion: () =>
    mutationOptions({
      mutationKey: [...wikiPageMutations.pages(), "restoreVersion"] as const,
      mutationFn: postRestorePageVersion,
    }),
} as const;
