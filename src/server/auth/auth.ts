import { LoginSchema } from "@/schemas/LoginSchema";
import { NextAuthOptions, Session } from "next-auth";
import { prisma } from "@/server/db";
import { routes } from "@/globals/routes";
import { verify } from "argon2";
import CredentialsProvider from "next-auth/providers/credentials";

export interface SessionWithId extends Session {
  id: string;
}
export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const creds = await LoginSchema.parseAsync(credentials);

        const user = await prisma.user.findFirst({
          where: { email: creds.email },
        });

        if (!user) {
          return null;
        }

        const isValidPassword = await verify(user.password, creds.password);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.username,
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        (session as SessionWithId).id = token.id as string;
      }

      return session;
    },
  },
  jwt: {
    secret: "super-secret",
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: routes.login().href,
    newUser: routes.signup().href,
  },
  session: {
    strategy: "jwt",
  },
};
