import { z } from "zod";

export const FutureMessageSendSchema = z.object({
  recipientId: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
  scheduledAt: z.string().min(1),
});

export type FutureMessageSendSchemaType = z.infer<typeof FutureMessageSendSchema>;
