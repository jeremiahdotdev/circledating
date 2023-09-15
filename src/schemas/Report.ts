import { z } from "zod";

export const Report = {
  id: z.string().optional(),
  circleId: z.string().optional(),
  reporterUsername: z.string(),
  reportedUsername: z.string(),
  message: z.string().min(1).max(200),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
};

export const ReportSchema = z.object(Report);
export const ReportAggregatesSchema = z.object({
  ...Report,
  _count: z.object({
    reportedUsername: z.number().optional(),
  }),
});

export type ReportSchemaType = z.infer<typeof ReportSchema>;
export type ReportAggregatesSchemaType = z.infer<typeof ReportAggregatesSchema>;
