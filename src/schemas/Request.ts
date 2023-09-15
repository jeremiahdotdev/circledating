import { z } from "zod";

export const RequestSchema = z.object({
  id: z.string().optional(),
  circleId: z.string(),
  userId: z.string(),
  message: z.string().min(1).max(2000),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),

  username: z.string().optional(),
});

export type RequestSchemaType = z.infer<typeof RequestSchema>;
