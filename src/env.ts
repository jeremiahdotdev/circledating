import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "PUBLIC_",
  server: {
    POSTGRES_URL: z.string(),
    NODE_ENV: z.string(),
  },
  client: {},
  runtimeEnv: process.env,
});
