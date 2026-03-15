import { HoBomSchema, type Infer } from "hobom-schema";

export const FutureMessageSendSchema = HoBomSchema.object({
  recipientId: HoBomSchema.string().min(1),
  title: HoBomSchema.string().min(1),
  content: HoBomSchema.string().min(1),
  scheduledAt: HoBomSchema.string().min(1),
});

export type FutureMessageSendSchemaType = Infer<typeof FutureMessageSendSchema>;
