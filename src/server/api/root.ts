import { createTRPCRouter } from "./trpc";
import { messagesRouter } from "./routers/messagesRouter";
import { profileRouter } from "./routers/profileRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  profiles: profileRouter,
  messages: messagesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
