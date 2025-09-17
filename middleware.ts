import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const AUTH_SECRET = process.env.NEXTAUTH_SECRET;
const PUBLIC_ROUTES = ["/login", "/signup"];
const ADMIN_PREFIX = "/admin";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: AUTH_SECRET });
  if (token && PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (pathname.startsWith(ADMIN_PREFIX)) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (token.role !== "SUPERADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/admin/:path*"],
};
