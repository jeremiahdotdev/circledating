import { ReportSchema } from "@/schemas/Report";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { reportScripts } from "../prisma/reportScripts";
import { z } from "zod";

export const reportRouter = createTRPCRouter({
  create: publicProcedure
    .input(ReportSchema)
    .mutation(reportScripts.mutate.create),
  readAllByCircle: publicProcedure
    .input(z.string())
    .mutation(reportScripts.query.readAllByCircle),
});
