import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

export const SignupSchema = LoginSchema.extend({
  username: z.string().min(3).max(255),
});
