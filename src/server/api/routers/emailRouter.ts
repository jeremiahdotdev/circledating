import { EmailSchema } from "@/schemas/Email";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { emailScripts } from "../aws/emailScripts";

export const emailRouter = createTRPCRouter({
  send: publicProcedure.input(EmailSchema).mutation(emailScripts.mutate.send),
});
