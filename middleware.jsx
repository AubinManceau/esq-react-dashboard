import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const roleAccessMap = {
  "/admin/utilisateurs": [4],
  "/admin/articles": [3, 4],
  "/admin/convocations": [2, 4],
  "/admin/equipes": [3, 4],
  "/admin/presences": [2, 4],
};

async function verifyToken(token) {
  try {
    const secretKey = new TextEncoder().encode(process.env.SECRET_KEY_ACCESS_TOKEN);
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  const payload = token ? await verifyToken(token) : null;

  if (!payload && refreshToken) {
    try {
      const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "x-client-type": "web",
        },
        credentials: "include",
        body: JSON.stringify({ refreshToken }),
      });

      if (refreshRes.ok) {
        const response = NextResponse.next();
        const setCookieHeader = refreshRes.headers.get("set-cookie");
        if (setCookieHeader) response.headers.set("set-cookie", setCookieHeader);
        return response;
      }
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (pathname.startsWith("/login") && payload) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (pathname.startsWith("/admin") && !payload) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname.startsWith("/admin") && payload) {
    const roles = Array.isArray(payload.roles) ? payload.roles : [];

    for (const [pathPrefix, allowedRoles] of Object.entries(roleAccessMap)) {
      if (pathname.startsWith(pathPrefix)) {
        const hasAccess = roles.some(r => allowedRoles.includes(r.roleId));
        if (!hasAccess) {
          return NextResponse.redirect(new URL("/admin", req.url));
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
