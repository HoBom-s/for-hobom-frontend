import { validateWithZod } from "@/shared/lib";
import {
  FutureMessageSendSchema,
  type FutureMessageSendSchemaType,
} from "@/entities/future-message/model/future-message-send.model.ts";

export const validateFutureMessageSendInput = (
  input: unknown,
): FutureMessageSendSchemaType | Error => {
  return validateWithZod(FutureMessageSendSchema)(input);
};
