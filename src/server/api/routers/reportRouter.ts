import { ReportSchema } from "@/schemas/Report";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const reportRouter = createTRPCRouter({
  create: publicProcedure
    .input(ReportSchema)
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma.userReport.create({
        data: input,
      });
      return result;
    }),
  readAllByCircle: publicProcedure
    .input(z.object({ circleId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma.userReport.groupBy({
        by: ["reportedUsername", "circleId"],
        _count: {
          reportedUsername: true,
        },
        orderBy: {
          _count: {
            reportedUsername: "desc",
          },
        },
        having: {
          reportedUsername: {
            _count: {
              gt: 0,
            },
          },
        },
        where: input,
      });
      return result;
    }),
});
