import { DefaultArgs } from "@prisma/client/runtime/library";
import { Prisma, PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

export type PrismaContext = {
  ctx: {
    session: Session | null;
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  };
};

export type PrismaParameter<TInput> = {
  input: TInput;
  ctx: PrismaContext["ctx"];
};
