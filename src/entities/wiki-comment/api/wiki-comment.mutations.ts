import { mutationOptions } from "@tanstack/react-query";
import {
  postCreateComment,
  putUpdateComment,
  deleteComment,
} from "./wiki-comment.api";

export const wikiCommentMutations = {
  comments: () => ["wiki-comments"] as const,

  create: () =>
    mutationOptions({
      mutationKey: [...wikiCommentMutations.comments(), "create"] as const,
      mutationFn: postCreateComment,
    }),

  update: () =>
    mutationOptions({
      mutationKey: [...wikiCommentMutations.comments(), "update"] as const,
      mutationFn: putUpdateComment,
    }),

  delete: () =>
    mutationOptions({
      mutationKey: [...wikiCommentMutations.comments(), "delete"] as const,
      mutationFn: deleteComment,
    }),
} as const;
