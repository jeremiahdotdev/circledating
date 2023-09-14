import { UserType } from "@prisma/client";
import { z } from "zod";

export const UserTypeSchema = z.nativeEnum(UserType);

export type UserTypeSchemaType = z.infer<typeof UserTypeSchema>;
