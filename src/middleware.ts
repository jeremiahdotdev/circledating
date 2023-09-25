import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const requireUser = [
  "/avatar",
  "/circle",
  "/circles",
  "/dashboard",
  "/matches",
  "/messages",
  "new-circle",
  "/search",
];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const session = await getToken({ req: req, secret: process.env.SECRET });

  if (requireUser.some((prefix) => pathname.startsWith(prefix))) {
	if (session.)
    return NextResponse.next();
  }

  // apply trailing slash handling
  if (
    !pathname.endsWith("/") &&
    !pathname.match(/((?!\.well-known(?:\/.*)?)(?:[^/]+\/)*[^/]+\.\w+)/)
  ) {
    req.nextUrl.pathname += "/";
    return NextResponse.redirect(req.nextUrl);
  }
}
