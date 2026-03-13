import { validateWithZod } from "@/shared/lib";
import {
  FutureMessageSendSchema,
  type FutureMessageSendSchemaType,
} from "./future-message-send.model";

export const validateFutureMessageSendInput = (
  input: unknown,
): FutureMessageSendSchemaType | Error => {
  return validateWithZod(FutureMessageSendSchema)(input);
};
