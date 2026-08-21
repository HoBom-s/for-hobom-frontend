import { httpClient, parseResponse } from "@/shared/api";
import { messagesSchema, postMessageResultSchema } from "./conversation.schema";
import type { PostMessageResult } from "./conversation.type";
import type { Message, MessageSubjectType } from "../model/conversation.model";

const parseThread = parseResponse(
  messagesSchema,
  "GET /conversations/:subjectType/:subjectRef/messages",
);
const parsePosted = parseResponse(
  postMessageResultSchema,
  "POST /conversations/:subjectType/:subjectRef/messages",
);

const threadPath = (subjectType: MessageSubjectType, subjectRef: string) =>
  `/conversations/${subjectType}/${subjectRef}/messages`;

/** The messages of one conversation, oldest first. */
export const getMessages = (
  subjectType: MessageSubjectType,
  subjectRef: string,
  signal?: AbortSignal,
): Promise<Message[]> =>
  httpClient.get(threadPath(subjectType, subjectRef), { signal }).then(parseThread);

/** Append a message to a conversation (applicant or shelter staff). */
export const postMessage = (
  subjectType: MessageSubjectType,
  subjectRef: string,
  body: string,
): Promise<PostMessageResult> =>
  httpClient.post(threadPath(subjectType, subjectRef), { body }).then(parsePosted);
