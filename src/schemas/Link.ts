import { z } from "zod";

export type Url = `https://${string}`;

export function isUrl(x: unknown): x is Url {
  return typeof x === "string" && x.startsWith("https://");
}

export const LinkSchema = z.object({
  href: z.custom<string>(),
});
export type LinkSchemaType = z.infer<typeof LinkSchema>;
