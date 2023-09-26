import {
  CircleUserSchema,
  CircleUserSearchSchema,
  MutateCircleSchema,
  UpdateImageSchema,
} from "@/schemas/Circle";
import { circleScripts } from "../prisma/circleScripts";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const circleRouter = createTRPCRouter({
  readById: publicProcedure
    .input(z.string())
    .query(circleScripts.query.readById),
  readFeatured: publicProcedure.query(circleScripts.query.readFeatured),
  readCurrent: publicProcedure.query(circleScripts.query.readCurrent),
  readByCode: publicProcedure
    .input(z.string())
    .query(circleScripts.query.readByCode),
  isCircleNameUnique: publicProcedure
    .input(z.string())
    .query(circleScripts.query.isCircleNameUnique),
  searchMany: publicProcedure
    .input(z.string())
    .mutation(circleScripts.query.searchMany),
  searchCircleForUser: publicProcedure
    .input(CircleUserSearchSchema)
    .query(circleScripts.query.searchCircleForUser),
  create: publicProcedure
    .input(MutateCircleSchema)
    .mutation(circleScripts.mutate.create),
  update: publicProcedure
    .input(MutateCircleSchema)
    .mutation(circleScripts.mutate.update),
  updateImage: publicProcedure
    .input(UpdateImageSchema)
    .mutation(circleScripts.mutate.updateImage),
  removeUserFromCircle: publicProcedure
    .input(CircleUserSchema)
    .mutation(circleScripts.mutate.removeUserFromCircle),
  addUserToCircle: publicProcedure
    .input(CircleUserSchema)
    .mutation(circleScripts.mutate.addUserToCircle),
  denyRequestToJoinCircle: publicProcedure
    .input(CircleUserSchema)
    .mutation(circleScripts.mutate.denyRequestToJoinCircle),
  removeSelfFromCircle: publicProcedure
    .input(z.string())
    .mutation(circleScripts.mutate.removeSelfFromCircle),
  addSelfToCircle: publicProcedure
    .input(z.string())
    .mutation(circleScripts.mutate.addSelfToCircle),
  requestToJoinCircle: publicProcedure
    .input(z.string())
    .mutation(circleScripts.mutate.requestToJoinCircle),
});
