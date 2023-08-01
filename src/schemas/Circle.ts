import { z } from "zod";

export const CircleSchema = z.object({
  name: z.string().min(3).max(20),
});

export type CircleSchemaType = z.infer<typeof CircleSchema>;
