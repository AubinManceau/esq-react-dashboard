import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const allowedRoles = [2, 3, 4];

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const secretKey = new TextEncoder().encode(process.env.SECRET_KEY_ACCESS_TOKEN);
    const { payload } = await jwtVerify(token, secretKey);

    const roles = Array.isArray(payload.roles) ? payload.roles : [];
    const hasAccess = roles.some(r => allowedRoles.includes(r.roleId));

    if (!hasAccess) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
