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
        headers: { "Content-Type": "application/json", "x-client-type": "web" },
        body: JSON.stringify({ refreshToken }),
        credentials: "include"
      });

      if (refreshRes.ok) {
        const data = await refreshRes.json();
        const newToken = data.token;

        if (!newToken) return NextResponse.redirect(new URL("/login", req.url));

        const response = NextResponse.next();
        response.cookies.set("token", newToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 15 * 60
        });

        return response;
      } else {
        return NextResponse.redirect(new URL("/login", req.url));
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

    if (roles.some(r => r.roleId === 1)) {
      return NextResponse.redirect(new URL("/", req.url));
    }

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
