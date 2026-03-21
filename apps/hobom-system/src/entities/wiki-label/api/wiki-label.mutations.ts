import { mutationOptions } from "hobom-data";
import {
  postCreateLabel,
  putUpdateLabel,
  deleteLabel,
  postAddPageLabel,
  deletePageLabel,
} from "./wiki-label.api";

export const wikiLabelMutations = {
  labels: () => ["wiki-labels"] as const,

  create: () =>
    mutationOptions({
      mutationKey: [...wikiLabelMutations.labels(), "create"] as const,
      mutationFn: postCreateLabel,
    }),

  update: () =>
    mutationOptions({
      mutationKey: [...wikiLabelMutations.labels(), "update"] as const,
      mutationFn: putUpdateLabel,
    }),

  delete: () =>
    mutationOptions({
      mutationKey: [...wikiLabelMutations.labels(), "delete"] as const,
      mutationFn: deleteLabel,
    }),

  addToPage: () =>
    mutationOptions({
      mutationKey: [...wikiLabelMutations.labels(), "addToPage"] as const,
      mutationFn: postAddPageLabel,
    }),

  removeFromPage: () =>
    mutationOptions({
      mutationKey: [...wikiLabelMutations.labels(), "removeFromPage"] as const,
      mutationFn: deletePageLabel,
    }),
} as const;
