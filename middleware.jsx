import { NextResponse } from "next/server";

const protectedRoutes = ["/admin"];
const authRoutes = ["/login"];

export async function middleware(req) {
  const { nextUrl, cookies } = req;
  const token = cookies.get("token");

  const isAuthenticated = !!token;

  if (!isAuthenticated && protectedRoutes.some((route) => nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuthenticated && authRoutes.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
