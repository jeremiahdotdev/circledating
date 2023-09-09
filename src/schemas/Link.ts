import { CircleLink, UserLink } from "@prisma/client";
import { z } from "zod";

export type Url = `https://${string}`;

export function isUrl(x: unknown): x is Url {
  return typeof x === "string" && x.startsWith("https://");
}

export const LinkSchema = z.object({
  id: z.string().optional(),
  circleId: z.string().optional(),
  userId: z.string().optional(),
  href: z.custom<Url>(),
});

export type LinkSchemaType = z.infer<typeof LinkSchema>;

export function getSecureLinks(links: UserLink[] | CircleLink[] | undefined) {
  if (!links) return [];

  const secureLinks: LinkSchemaType[] = [];
  links.forEach(
    (l) => isUrl(l.href) && secureLinks.push({ ...l, href: l.href })
  );
  return secureLinks;
}
