import { circleRouter } from "./routers/circleRouter";
import { conversationRouter } from "./routers/conversationRouter";
import { createTRPCRouter } from "./trpc";
import { interactionRouter } from "./routers/interactionRouter";
import { messagesRouter } from "./routers/messagesRouter";
import { preferencesRouter } from "./routers/preferencesRouter";
import { profileRouter } from "./routers/profileRouter";
import { reportRouter } from "./routers/reportRouter";
import { userRouter } from "./routers/userRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  profiles: profileRouter,
  messages: messagesRouter,
  interactions: interactionRouter,
  conversations: conversationRouter,
  circles: circleRouter,
  reports: reportRouter,
  users: userRouter,
  preferences: preferencesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
