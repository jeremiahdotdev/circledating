import { Gender } from "@prisma/client";
import { LoginSchema } from "@/schemas/LoginSchema";
import { NextAuthOptions } from "next-auth";
import { UserSchemaType } from "@/schemas/User";
import { prisma } from "@/server/db";
import { routes } from "@/globals/routes";
import { verify } from "argon2";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  export interface Session {
    id: string;
    sex: Gender;
    isAdmin: boolean;
  }
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
          include: {
            profile: {
              select: {
                sex: true,
              },
            },
          },
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
          sex: user?.profile?.sex,
          isAdmin: user?.isAdmin,
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.sex = (user as UserSchemaType).sex;
      }

      return { ...token, ...user };
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id as string;
        session.sex = token.sex as Gender;
        session.isAdmin = token.isAdmin as boolean;
      }

      return session;
    },
  },
  jwt: {
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
