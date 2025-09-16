import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

const allowedRoles = [2, 3, 4];

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = jwtDecode(token);
    const roles = Array.isArray(decoded.roles) ? decoded.roles : [];
    const hasAccess = roles.some((r) => allowedRoles.includes(r.roleId));
    if (!hasAccess) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
