import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import accessMap from "@/lib/adminAccess";

const SECRET = new TextEncoder().encode(process.env.SECRET_KEY_ACCESS_TOKEN);

if (!process.env.SECRET_KEY_ACCESS_TOKEN) {
  throw new Error("Missing SECRET_KEY_ACCESS_TOKEN environment variable");
}

const protectedRoutes = ["/admin"];
const authRoutes = ["/login"];

async function verifyJWT(token) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}

export async function middleware(req) {
  const { nextUrl, cookies } = req;
  const pathname = nextUrl.pathname;

  const token = cookies.get("token")?.value;
  const isAuthenticated = !!token;

  if (!isAuthenticated && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  let userRoles = [];
  if (isAuthenticated && token) {
    const payload = await verifyJWT(token);
    if (!payload) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    userRoles = (payload.roles || []);
  }

  if (isAuthenticated && authRoutes.includes(pathname)) {
    const hasAdminAccess = userRoles.some((r) =>
      accessMap["/admin"]?.includes(r.roleId)
    );
    if (!hasAdminAccess) {
      cookies.delete("token");
    }

    return NextResponse.redirect(new URL(hasAdminAccess ? "/admin" : "/login", req.url));
  }

  const matchedPath = Object.keys(accessMap)
    .filter((key) => pathname === key || pathname.startsWith(`${key}/`))
    .reduce((longest, key) => (key.length > longest.length ? key : longest), "");

  if (matchedPath) {
    const allowedRoles = accessMap[matchedPath] || [];
    const isAllowed = userRoles.some((r) => allowedRoles.includes(r.roleId));

    if (!isAllowed) {
      const hasAdminAccess = userRoles.some((r) =>
        accessMap["/admin"]?.includes(r.roleId)
      );
      if (!hasAdminAccess) {
        cookies.delete("token");
      }

      return NextResponse.redirect(new URL(hasAdminAccess ? "/admin" : "/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
  ],
};
