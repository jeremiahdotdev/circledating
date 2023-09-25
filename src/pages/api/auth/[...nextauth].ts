import { nextAuthOptions } from "@/server/auth/auth";
import NextAuth from "next-auth/next";

export default NextAuth(nextAuthOptions);
