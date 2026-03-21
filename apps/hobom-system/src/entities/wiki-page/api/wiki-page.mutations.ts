import { mutationOptions } from "hobom-data";
import {
  postCreatePage,
  putUpdatePage,
  deletePage,
  postRestorePageVersion,
  patchMovePage,
  postCopyPage,
  postRestoreTrashPage,
  deleteTrashPagePermanently,
} from "./wiki-page.api";

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

  move: () =>
    mutationOptions({
      mutationKey: [...wikiPageMutations.pages(), "move"] as const,
      mutationFn: patchMovePage,
    }),

  copy: () =>
    mutationOptions({
      mutationKey: [...wikiPageMutations.pages(), "copy"] as const,
      mutationFn: postCopyPage,
    }),

  restoreTrash: () =>
    mutationOptions({
      mutationKey: [...wikiPageMutations.pages(), "restoreTrash"] as const,
      mutationFn: postRestoreTrashPage,
    }),

  permanentDelete: () =>
    mutationOptions({
      mutationKey: [...wikiPageMutations.pages(), "permanentDelete"] as const,
      mutationFn: deleteTrashPagePermanently,
    }),
} as const;
