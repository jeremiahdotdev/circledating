import { z } from "zod";

export const EmailSchema = z.object({
  subject: z.string(),
  body: z.string().min(5).max(2000),
  email: z.string().email(),
});

export type EmailSchemaType = z.infer<typeof EmailSchema>;
