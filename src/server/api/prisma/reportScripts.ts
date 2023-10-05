import { PrismaParameter } from "../types";
import { ReportSchemaType } from "@/schemas/Report";

export const reportScripts = {
  query: {
    readAllByCircle: async ({ input, ctx }: PrismaParameter<string>) => {
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
        where: {
          circleId: input,
        },
      });
      return result;
    },
  },
  mutate: {
    create: async ({ input, ctx }: PrismaParameter<ReportSchemaType>) => {
      const result = await ctx.prisma.userReport.create({
        data: input,
      });
      return result;
    },
  },
};
