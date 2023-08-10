import { Continent } from "@prisma/client";
import { z } from "zod";

export const ContinentSchema = z.nativeEnum(Continent);

export type ContinentSchemaType = z.infer<typeof ContinentSchema>;
