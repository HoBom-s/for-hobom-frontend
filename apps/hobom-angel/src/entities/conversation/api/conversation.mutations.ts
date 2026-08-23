import { mutationOptions } from "hobom-data";
import { postMessage } from "./conversation.api";
import type { MessageSubjectType } from "../model/conversation.model";

export const conversationMutations = {
  post: () =>
    mutationOptions({
      mutationFn: (vars: { subjectType: MessageSubjectType; subjectRef: string; body: string }) =>
        postMessage(vars.subjectType, vars.subjectRef, vars.body),
    }),
} as const;
