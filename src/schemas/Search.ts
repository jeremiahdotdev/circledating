import { z } from "zod";

export const SearchSchema = z.object({
  search: z.string(),
});

export type SearchSchemaType = z.infer<typeof SearchSchema>;
