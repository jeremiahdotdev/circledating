import { Ethnicity } from "@prisma/client";
import { z } from "zod";

export const EthnicitySchema = z.nativeEnum(Ethnicity);
